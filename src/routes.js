/* Import Module */
const { addBookHandler } = require('./handler')

/* Method/Verb Request */
const routes = [{
  /* Add Book */
  method: 'POST',
  path: '/books',
  handler: addBookHandler
}]

/* Export Module */
module.exports = routes
