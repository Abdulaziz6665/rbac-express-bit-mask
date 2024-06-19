import { UserRoleType } from '../../interface/interface'
import { fetch } from '../../services/postgres'
import * as dto from './user.dto'

const GET_USER = `
SELECT
    user_id,
    user_name,
    user_role,
    user_email
FROM users
WHERE user_id = $1`

function getUser(user_id: string): Promise<dto.IGetUser> {
  return fetch(GET_USER, user_id)
}

const UPDATE_USER_ROLE = `
UPDATE users
SET user_role = $2
WHERE user_id = $1
returning user_id, user_name, user_role, user_email`

function updateUserRole(user_id: string, role: UserRoleType): Promise<dto.IGetUser> {
  return fetch(UPDATE_USER_ROLE, user_id, role)
}
export default {
  getUser,
  updateUserRole,
}
