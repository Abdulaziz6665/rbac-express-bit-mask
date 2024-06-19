import { fetch } from '../../services/postgres'
import * as dto from './login.dto'

const CHECK_UNIQ_USER_NAME = `
SELECT user_id FROM users WHERE lower(user_name) = lower($1)`

function checkUserName(user_name: string): Promise<{ user_id: string }> {
  return fetch(CHECK_UNIQ_USER_NAME, user_name)
}

const REGISTER_USER = `
INSERT INTO users(
    user_name,
    user_email,
    user_password
) VALUES ($1, $2, crypt($3, gen_salt('bf')))
returning user_id, user_name, user_role, user_email`

function registerUser(data: dto.IRegistr): Promise<dto.IRegistred> {
  return fetch(REGISTER_USER, data.username, data.email, data.password)
}

const CHECK_USER_LOGIN = `
SELECT
    user_id,
    user_name,
    user_role,
    user_email
FROM users
WHERE lower(user_name) = lower($1) and user_password = crypt($2, user_password)`

function checkUserLogin(data: dto.ILogin): Promise<dto.IRegistred> {
  return fetch(CHECK_USER_LOGIN, data.username, data.password)
}

export default {
  registerUser,
  checkUserLogin,
  checkUserName,
}
