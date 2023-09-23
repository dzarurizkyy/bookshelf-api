/* Web Framework */
const Hapi = require('@hapi/hapi')

/* Import Module */
const routes = require('./routes')

/* Configuration Web Server */
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      /* Same Origin Policy */
      cors: {
        origin: ['*']
      }
    }
  })
  /* Configuration Routes */
  // server.route(routes)

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

/* Enable Web Server */
init()
