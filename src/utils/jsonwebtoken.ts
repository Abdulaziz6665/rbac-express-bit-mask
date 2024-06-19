import { sign, verify, IJwtPayload } from 'jsonwebtoken'
import env from '../configs/env'

declare module 'jsonwebtoken' {
  export interface IJwtPayload extends JwtPayload {
    user_id: string
  }
}

export function _sign(payload: IJwtPayload) {
  return sign(payload, env.jwt.JWT_SECRET, { expiresIn: env.jwt.JWT_EXPIRE })
}

export function _verify(token: string): IJwtPayload {
  return <IJwtPayload>verify(token, env.jwt.JWT_SECRET)
}
