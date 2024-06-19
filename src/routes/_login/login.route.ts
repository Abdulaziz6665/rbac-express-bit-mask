import { Router } from 'express'
import login from './login.control'

const router = Router()

router.post('/register', login.REGISTRATION)
router.post('/login', login.LOGIN)

export default router
