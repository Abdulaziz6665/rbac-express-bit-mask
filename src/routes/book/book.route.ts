import { Router } from 'express'
import book from './book.control'
import { auth } from '../../middlewares/auth'
import { Rbac } from '../../interface/interface'

const router = Router()

router.post('/books', auth(Rbac.WRITE), book.ADD_BOOK)

router.get('/books', auth(Rbac.READ), book.GET_BOOKS)
router.get('/books/:book_id', auth(Rbac.READ), book.GET_BOOK_BY_ID)

router.put('/books', auth(Rbac.UPDATE), book.UPDATE_BOOK)

router.delete('/books/:book_id', auth(Rbac.DELETE), book.DELETE_BOOK)

export default router
