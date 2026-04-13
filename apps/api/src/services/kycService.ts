import { PrismaClient, KYCStatus } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @service KYCService
 * @dev Handles user identity verification lifecycle. 
 * Essential for RWA compliance and platform integrity.
 */
export class KYCService {
  /**
   * Generates a verification link or SDK token for the user.
   */
  async createVerificationSession(userId: string) {
    console.log(`[KYC] Creating verification session for user ${userId}`);
    // Integration logic for Sumsub/Persona SDK goes here
    return {
      token: "v-session-placeholder-token",
      url: "https://verify.quantum.ag/start?u=" + userId
    };
  }

  /**
   * Webhook handler for KYC status updates from provider.
   */
  async handleWebhook(providerData: any) {
    const { externalUserId, status, reviewResult } = providerData;
    
    console.log(`[KYC] Processing status update: ${status} for user ${externalUserId}`);

    let kycStatus: KYCStatus = KYCStatus.PENDING;
    if (status === 'completed' && reviewResult?.answer === 'GREEN') {
      kycStatus = KYCStatus.VERIFIED;
    } else if (reviewResult?.answer === 'RED') {
      kycStatus = KYCStatus.REJECTED;
    }

    // Atomic update of user and farmer kyc status
    return prisma.farmer.update({
      where: { userId: externalUserId },
      data: {
        kycStatus: kycStatus,
        kycVerifiedAt: kycStatus === KYCStatus.VERIFIED ? new Date() : null
      }
    });
  }

  /**
   * Internal check for high-value transactions.
   */
  async enforceKYC(userId: string) {
    const farmer = await prisma.farmer.findUnique({ where: { userId } });
    if (!farmer || farmer.kycStatus !== KYCStatus.VERIFIED) {
      throw new Error("KYC_REQUIRED: Verification level insufficient for this operation.");
    }
    return true;
  }
}
