import Joi from 'joi'
import { UserRoleType } from '../../interface/interface'

const userRoles: UserRoleType[] = ['ADMIN', 'USER']

export interface IUser {
  user_id: string
  user_name: string
  user_password: string
  user_role: UserRoleType
  user_email: string
  created_at: Date
}

export interface IGetUser extends Omit<IUser, 'user_password' | 'created_at'> {}

export interface IUpdateRole {
  user_id: string
  user_role: UserRoleType
}

export const updateSchema = Joi.object<IUpdateRole>({
  user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  user_role: Joi.string()
    .valid(...userRoles)
    .required(),
})
