import { Router } from 'express'
import users from './user.control'
import { auth } from '../../middlewares/auth'
import { Rbac } from '../../interface/interface'

const router = Router()

router.get('/users/me', auth(Rbac.READ), users.GET_USER)
router.put('/users/role', auth(Rbac.UPDATE), users.UPDATE_ROLE)

export default router
