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
  const updateAt = insertedAt

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
    updateAt
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

/* Export Module */
module.exports = {
  addBookHandler,
  getAllBooksHandler
}
