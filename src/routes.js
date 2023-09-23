/* Import Module */
const {
  addBookHandler,
  getAllBooksHandler
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
}]

/* Export Module */
module.exports = routes
