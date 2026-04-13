import { PrismaClient } from '@prisma/client'
import Decimal from 'decimal.js'

interface CreditScore {
  score: number          // 0–1000
  limit: Decimal
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  breakdown: Record<string, number>
}

export class CreditScoringService {
  constructor(private prisma: PrismaClient) {}

  async computeScore(farmerId: string): Promise<CreditScore> {
    const farmer = await this.prisma.farmer.findUnique({
      where: { id: farmerId },
      include: {
        creditTokens: { include: { repaymentSchedule: { include: { payments: true } } } },
        harvestReports: true
      }
    })

    if (!farmer) throw new Error('Farmer not found')

    const breakdown: Record<string, number> = {}

    // 1. Repayment history (40%)
    const totalTokens = farmer.creditTokens.length
    const repaidOnTime = farmer.creditTokens.filter(t =>
      t.repaymentSchedule?.status === 'COMPLETED' &&
      t.repaymentSchedule?.completedAt &&
      t.repaymentSchedule?.completedAt <= t.repaymentSchedule?.dueDate
    ).length
    breakdown.repaymentHistory = totalTokens > 0
      ? Math.round((repaidOnTime / totalTokens) * 400)
      : 200  // neutral for new farmers

    // 2. KYC completeness (20%)
    breakdown.kycScore = farmer.kycStatus === 'VERIFIED' ? 200
      : farmer.kycStatus === 'SUBMITTED' ? 100 : 50

    // 3. Farm size & crop diversity (20%)
    const farmScore = Math.min(200, Number(farmer.farmSizeAcres || 0) * 20)
    breakdown.farmProfile = farmScore

    // 4. Harvest track record (20%)
    const avgYield = farmer.harvestReports.length > 0
      ? farmer.harvestReports.reduce((s, h) => s + Number(h.yieldKg), 0) / farmer.harvestReports.length
      : 0
    breakdown.harvestHistory = Math.min(200, avgYield / 10)

    const totalScore = Object.values(breakdown).reduce((a, b) => a + b, 0)

    // Determine credit limit based on score
    let limit: Decimal
    let riskLevel: CreditScore['riskLevel']

    if (totalScore >= 750) { limit = new Decimal(50000); riskLevel = 'LOW' }
    else if (totalScore >= 500) { limit = new Decimal(25000); riskLevel = 'MEDIUM' }
    else if (totalScore >= 300) { limit = new Decimal(10000); riskLevel = 'HIGH' }
    else { limit = new Decimal(5000); riskLevel = 'VERY_HIGH' }

    // Update farmer profile
    await this.prisma.farmer.update({
      where: { id: farmerId },
      data: { creditScore: totalScore, creditLimit: limit }
    })

    return { score: totalScore, limit, riskLevel, breakdown }
  }
}
