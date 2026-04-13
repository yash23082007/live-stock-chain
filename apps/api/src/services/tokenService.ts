import { PrismaClient, TokenStatus } from '@prisma/client'
import { LedgerService } from './ledgerService'
import Decimal from 'decimal.js'

export class TokenService {
  private ledger: LedgerService

  constructor(private prisma: PrismaClient) {
    this.ledger = new LedgerService(prisma)
  }

  async issueToken(applicationId: string, approvedBy: string) {
    return this.prisma.$transaction(async (tx) => {
      const application = await tx.creditApplication.findUnique({
        where: { id: applicationId },
        include: { farmer: true, season: true }
      })

      if (!application) throw new Error('Application not found')
      if (application.status !== 'APPROVED') throw new Error('Application not approved')
      if (!application.approvedAmount) throw new Error('Approved amount not set')

      const tokenCode = `FIF-${Date.now()}`

      const token = await tx.creditToken.create({
        data: {
          tokenCode,
          farmerId: application.farmerId,
          applicationId,
          seasonId: application.seasonId,
          issuedAmount: application.approvedAmount,
          remainingAmount: application.approvedAmount,
          interestRate: new Decimal('12.00'),
          expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months
          status: 'ISSUED',
        }
      })

      const principal = new Decimal(application.approvedAmount.toString())
      const interest = principal.mul(0.12).mul(6).div(12)
      const totalDue = principal.plus(interest)

      await tx.repaymentSchedule.create({
        data: {
          tokenId: token.id,
          totalDue,
          dueDate: application.expectedHarvestDate
        }
      })

      await tx.creditApplication.update({
        where: { id: applicationId },
        data: { status: 'DISBURSED' }
      })

      await tx.farmer.update({
        where: { id: application.farmerId },
        data: { totalBorrowed: { increment: application.approvedAmount } }
      })

      await this.ledger.record(tx, {
        tokenId: token.id,
        type: 'TOKEN_ISSUANCE',
        amount: application.approvedAmount,
        balanceBefore: new Decimal(0),
        balanceAfter: application.approvedAmount,
        createdBy: approvedBy
      })

      return token
    })
  }
}
