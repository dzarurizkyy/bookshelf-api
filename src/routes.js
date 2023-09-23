/* Import Module */
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler
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
}]

/* Export Module */
module.exports = routes
