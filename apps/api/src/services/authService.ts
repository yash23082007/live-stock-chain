import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'
import type { FastifyInstance } from 'fastify'

export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private app: FastifyInstance
  ) {}

  async register(data: {
    phone: string
    password: string
    role: string
    firstName: string
    lastName: string
  }) {
    const existing = await this.prisma.user.findUnique({
      where: { phone: data.phone }
    })
    if (existing) throw new Error('Phone number already registered')

    const passwordHash = await bcrypt.hash(data.password, 12)

    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          phone: data.phone,
          passwordHash,
          role: data.role as any
        }
      })

      if (data.role === 'FARMER') {
        await tx.farmer.create({
          data: {
            userId: newUser.id,
            firstName: data.firstName,
            lastName: data.lastName,
            district: '',
            region: ''
          }
        })
      }

      return newUser
    })

    return this.generateTokenPair(user)
  }

  async login(phone: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { phone } })
    if (!user || !user.isActive) throw new Error('Invalid credentials')

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) throw new Error('Invalid credentials')

    return this.generateTokenPair(user)
  }

  async refreshToken(token: string) {
    const session = await this.prisma.session.findUnique({
      where: { refreshToken: token },
      include: { user: true }
    })

    if (!session || session.expiresAt < new Date()) {
      throw new Error('Invalid or expired refresh token')
    }

    await this.prisma.session.delete({ where: { id: session.id } })
    return this.generateTokenPair(session.user)
  }

  private async generateTokenPair(user: { id: string; role: string; phone: string }) {
    const accessToken = this.app.jwt.sign({
      sub: user.id,
      role: user.role,
      phone: user.phone
    })

    const refreshToken = crypto.randomBytes(64).toString('hex')
    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    })

    return { accessToken, refreshToken, user: { id: user.id, role: user.role } }
  }
}
