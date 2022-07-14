// bcrypt hash, bcrypt compare, generatejwt, decodetoken
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { JwtPayload } from 'jsonwebtoken'
import config from '../config'

export function generateRandomCode (length: number) {
  return crypto
    .randomBytes(length * 3)
    .toString('base64')
    .split('+')
    .join('')
    .split('/')
    .join('')
    .split('=')
    .join('')
    .substr(0, length)
}

export async function bcryptHash (password: string) {
  const salt = await bcrypt.genSalt(config.app.saltRounds)
  return bcrypt.hash(password, salt)
}

export function bcryptCompare (password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function decodeToken (token: string): Promise<JwtPayload> {
  const result = jwt.verify(token, config.app.secret) as JwtPayload
  return result
}

export async function generateJWTToken (
  payload: Record<string, any>,
  expires?: number,
  secret: string = config.app.secret
): Promise<string> {
  const token = jwt.sign(
    {
      ...payload,
      counter: generateRandomCode(36)
    },
    secret,
    { expiresIn: expires || '24h' }
  )
  return token
}
