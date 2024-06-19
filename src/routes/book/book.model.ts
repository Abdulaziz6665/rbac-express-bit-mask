import { fetch, fetchAll } from '../../services/postgres'
import * as dto from './book.dto'

const ADD_BOOK = `
INSERT INTO books (
    book_title,
    book_author,
    book_publication_date,
    book_genres
) VALUES ($1, $2, $3, $4) returning *`

function addBook(data: dto.IAddBook): Promise<dto.IBook> {
  return fetch(
    ADD_BOOK,
    data.book_title,
    data.book_author,
    data.book_publication_date,
    data.book_genres,
  )
}

const GET_BOOKS = `
SELECT 
    book_id,
    book_title,
    book_author,
    book_publication_date,
    book_genres,
    created_at
FROM books`

function getBooks(): Promise<dto.IBook[]> {
  return fetchAll(GET_BOOKS)
}

const GET_BOOK_BY_ID = `
SELECT 
    book_id,
    book_title,
    book_author,
    book_publication_date,
    book_genres,
    created_at
FROM books
WHERE book_id = $1`

function getBookById(book_id: string): Promise<dto.IBook> {
  return fetch(GET_BOOK_BY_ID, book_id)
}

const UPDATE_BOOK = `
UPDATE books SET
    book_title = $2,
    book_author = $3,
    book_publication_date = $4,
    book_genres = $5
WHERE book_id = $1
returning *`

function updateBook(data: dto.IUpdateBook): Promise<dto.IBook> {
  return fetch(
    UPDATE_BOOK,
    data.book_id,
    data.book_title,
    data.book_author,
    data.book_publication_date,
    data.book_genres,
  )
}

const SOFT_DELETE_BOOK = `
UPDATE books SET deleted = now() WHERE book_id = $1 returning *`

function softDeleteBook(book_id: string): Promise<dto.IBook> {
  return fetch(SOFT_DELETE_BOOK, book_id)
}

export default {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  softDeleteBook,
}
