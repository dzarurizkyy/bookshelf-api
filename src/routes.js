/* Import Module */
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
} = require('./handler')

/* Method/Verb Request */
const routes = [{
  /* Add Book */
  method: 'POST',
  path: '/books',
  handler: addBookHandler
},
{
  /* Display All Books */
  method: 'GET',
  path: '/books',
  handler: getAllBooksHandler
},
{
  /* Display Selected Book */
  method: 'GET',
  path: '/books/{bookId}',
  handler: getBookByIdHandler
},
{
  /* Edit Book */
  method: 'PUT',
  path: '/books/{bookId}',
  handler: editBookByIdHandler
},
{
  /* Delete Book */
  method: 'DELETE',
  path: '/books/{bookId}',
  handler: deleteBookByIdHandler
}]

/* Export Module */
module.exports = routes
