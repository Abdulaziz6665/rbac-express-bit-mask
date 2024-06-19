import { Request, Response } from 'express'
import { TJoi } from '../../interface/interface'
import * as dto from './book.dto'
import model from './book.model'

export default {
  ADD_BOOK: async (req: Request, res: Response) => {
    try {
      const data = req.body as dto.IAddBook
      const { value, error }: TJoi<dto.IAddBook> = dto.addSchema.validate(data)

      const returnData = {
        data: null,
        error: null,
      }

      if (error) {
        returnData.error = error.details[0].message
        return res.status(400).json(returnData)
      }

      const addedBook = await model.addBook(value)

      if (!addedBook) {
        returnData.error = 'something went wrong'
        return res.status(500).json(returnData)
      }

      returnData.data = addedBook
      res.json(returnData)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  GET_BOOKS: async (_: Request, res: Response) => {
    try {
      const books = await model.getBooks()
      res.json(books)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  GET_BOOK_BY_ID: async (req: Request, res: Response) => {
    try {
      const data = req.params as dto.IGetOneBook

      const { value, error }: TJoi<dto.IGetOneBook> = dto.getOneSchema.validate(data)
      if (error) return res.status(400).json(error.details[0].message)

      const book = await model.getBookById(value.book_id)
      if (!book) return res.json('Book not found')

      res.json(book)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  UPDATE_BOOK: async (req: Request, res: Response) => {
    try {
      const data = req.body as dto.IUpdateBook
      const { value, error }: TJoi<dto.IUpdateBook> = dto.updateSchema.validate(data)

      const returnData = {
        data: null,
        error: null,
      }

      if (error) {
        returnData.error = error.details[0].message
        return res.status(400).json(returnData)
      }

      const updated = await model.updateBook(value)

      if (!updated) {
        returnData.error = 'Book not found'
        return res.status(500).json(returnData)
      }

      returnData.data = updated
      res.json(returnData)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  DELETE_BOOK: async (req: Request, res: Response) => {
    try {
      const data = req.params as dto.IGetOneBook
      const { value, error }: TJoi<dto.IGetOneBook> = dto.getOneSchema.validate(data)

      const returnData = {
        data: null,
        error: null,
      }

      if (error) {
        returnData.error = error.details[0].message
        return res.status(400).json(returnData)
      }

      const deleted = await model.softDeleteBook(value.book_id)

      if (!deleted) {
        returnData.error = 'Book not found'
        return res.status(500).json(returnData)
      }

      returnData.data = deleted
      res.json(returnData)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
}
