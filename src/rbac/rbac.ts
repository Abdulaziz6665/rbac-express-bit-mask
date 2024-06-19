import { Rbac, UserRoleType } from '../interface/interface'

export const permission: Record<UserRoleType, Rbac> = {
  USER: Rbac.READ,
  ADMIN: Rbac.READ | Rbac.WRITE | Rbac.UPDATE | Rbac.DELETE,
}
