import Joi from 'joi'
import { BookGenres } from '../../interface/interface'

const genres: BookGenres[] = ['ART', 'FANTASY', 'FOLKLORE']

export interface IBook {
  book_id: string
  book_title: string
  book_author: string
  book_publication_date: string
  book_genres: BookGenres
  created_at: Date
}

export interface IAddBook extends Omit<IBook, 'book_id' | 'created_at'> {}

export const addSchema = Joi.object<IAddBook>({
  book_title: Joi.string().required(),
  book_author: Joi.string().max(64).required(),
  book_publication_date: Joi.string().isoDate().required(),
  book_genres: Joi.string()
    .valid(...genres)
    .required(),
})

export interface IGetOneBook extends Pick<IBook, 'book_id'> {}

export const getOneSchema = Joi.object<IGetOneBook>({
  book_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
})

export interface IUpdateBook extends Omit<IBook, 'created_at'> {}

export const updateSchema = Joi.object<IUpdateBook>({
  book_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
  book_title: Joi.string().required(),
  book_author: Joi.string().max(64).required(),
  book_publication_date: Joi.string().isoDate().required(),
  book_genres: Joi.string()
    .valid(...genres)
    .required(),
})
