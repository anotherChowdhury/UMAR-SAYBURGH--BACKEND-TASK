import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './contants'
import { sign } from 'jsonwebtoken'

export const createAccessToken = (userId) => {
  const accessToken = sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
  return accessToken
}

export const createRefreshToken = (userId) => {
  const refreshToken = sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '10d' })
  return refreshToken
}
