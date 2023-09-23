/* Third-Party Module */
const { nanoid } = require('nanoid')

/* Import Module */
const books = require('./books')

/* Add Book Handler */
const addBookHandler = (request, h) => {
  /* User-Input Objects */
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload
  /* Automatic Objects */
  const id = nanoid(16)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  /* Check user input name or not */
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  /* Check user input readPage value more than pageCount value or not */
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  /* Save to array books */
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }
  books.push(newBook)

  /* Check book data successfully saved or not */
  const isSuccess = books.filter((book) => book.name === name).length > 0
  /* Success */
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
  /* Fail */
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

/* Display All Books */
const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    /* Filter to only retrieve specific properties and values */
    books: books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }))
  }
})

/* Display Selected Book */
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params
  /* Find correct id */
  const book = books.filter((book) => book.id === bookId)[0]
  /* Success */
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }
  /* Fail */
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

/* Edit Book */
const editBookByIdHandler = (request, h) => {
  /* Retrieve path parameter */
  const { bookId } = request.params
  /* User-Input Objects */
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload
  /* Automatic Objects */
  const updatedAt = new Date().toISOString()

  /* Check user input name or not */
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  /* Check user input readPage value more than pageCount value or not */
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  /* Check book id exist or not */
  const index = books.findIndex((book) => book.id === bookId)
  /* Data found */
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  /* Data not found */
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

/* Export Module */
module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler
}
