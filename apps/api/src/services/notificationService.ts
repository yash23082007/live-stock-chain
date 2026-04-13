import AfricasTalking from 'africastalking'

const AT = AfricasTalking({
  apiKey: process.env.AT_API_KEY || 'sandbox',
  username: process.env.AT_USERNAME || 'sandbox'
})

export class NotificationService {
  private sms = AT.SMS

  async sendTokenIssuanceAlert(phone: string, tokenCode: string, amount: number) {
    const message = `Habari! Credit token ${tokenCode} ya KES ${amount.toLocaleString()} imetolewa. ` +
      `Tumia code hii kununua pembejeo kwenye duka lolote linaloshiriki. ` +
      `Rejesha baada ya mavuno. FarmInputFinance`

    return this.sms.send({
      to: [phone],
      message,
      from: 'FarmFin'
    })
  }

  async sendRepaymentReminder(phone: string, amount: number, daysLeft: number) {
    const message = `Ukumbusho: Mkopo wako wa KES ${amount.toLocaleString()} unamaliza baada ya siku ${daysLeft}. ` +
      `Lipa kupitia M-Pesa: *384*7#. Asante! FarmInputFinance`

    return this.sms.send({ to: [phone], message, from: 'FarmFin' })
  }

  async sendRepaymentConfirmation(phone: string, amount: number, ref: string) {
    const message = `Malipo ya KES ${amount.toLocaleString()} (Ref: ${ref}) yamepokewa. Asante kwa kulipa kwa wakati! FarmInputFinance`
    return this.sms.send({ to: [phone], message, from: 'FarmFin' })
  }
}