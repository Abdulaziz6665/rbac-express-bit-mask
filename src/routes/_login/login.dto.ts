import Joi from 'joi'

export interface IRegistr {
  username: string
  password: string
  email: string
}

export const registerSchema = Joi.object<IRegistr>({
  username: Joi.string().max(32).required(),
  password: Joi.string().max(32).required(),
  email: Joi.string()
    .max(32)
    .email({ minDomainSegments: 2, tlds: { allow: ['net', 'com'] } })
    .required(),
})

export interface IRegistred {
  user_id: string
  email: string
  username: string
  user_role: number
}

export interface ILogin extends Pick<IRegistr, 'username' | 'password'> {}

export const loginSchema = Joi.object<ILogin>({
  username: Joi.string().max(32).required(),
  password: Joi.string().max(32).required(),
})
