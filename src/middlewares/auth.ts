import { NextFunction, Request, Response } from 'express'
import { Rbac, UserData, UserRoleType } from '../interface/interface'
import { _verify } from '../utils/jsonwebtoken'
import userModel from '../routes/user/user.model'
import { permission } from '../rbac/rbac'

export const auth =
  (rbac: Rbac, accessRole?: UserRoleType[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      const verified = _verify(token)

      const user: UserData = {
        user_id: verified.user_id,
      }

      const hasUserInBase = await userModel.getUser(user.user_id)
      if (!hasUserInBase) return res.status(404).send('Not Found')

      const hasPermission = (permission[hasUserInBase.user_role] & rbac) === rbac
      let roleAccess = true

      if (accessRole?.length) {
        roleAccess = accessRole.some((role) => role === hasUserInBase.user_role)
      }

      if (!hasPermission || !roleAccess) {
        return res.status(403).send('Forbidden, Permission required')
      }

      req['user'] = user

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send('Unauthorized')
    }
  }
