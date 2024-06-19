import Joi from 'joi'

export type TJoi<T> = {
  value: T
  error: Joi.ValidationError
}

export enum Rbac {
  READ = 1 << 0,
  WRITE = 1 << 1,
  UPDATE = 1 << 2,
  DELETE = 1 << 3,
}

export type UserRoleType = 'USER' | 'ADMIN'

export type UserData = {
  user_id: string
}

export type BookGenres = 'FANTASY' | 'FOLKLORE' | 'ART'
