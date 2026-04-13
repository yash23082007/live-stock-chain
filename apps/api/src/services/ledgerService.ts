import { Prisma } from '@prisma/client'
import Decimal from 'decimal.js'

export class LedgerService {
  constructor(private prisma: any) {}

  async record(
    tx: Prisma.TransactionClient,
    data: {
      tokenId: string
      type: string
      amount: Decimal | any
      balanceBefore: Decimal | any
      balanceAfter: Decimal | any
      reference?: string
      metadata?: object
      createdBy?: string
    }
  ) {
    return tx.tokenTransaction.create({
      data: {
        tokenId: data.tokenId,
        type: data.type as any,
        amount: data.amount,
        balanceBefore: data.balanceBefore,
        balanceAfter: data.balanceAfter,
        reference: data.reference,
        metadata: data.metadata,
        createdBy: data.createdBy
      }
    })
  }
}
