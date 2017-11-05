const split = require('split2')
const stream = split(JSON.parse)
const fastify = require('fastify')({
  logger: {
    level: 'info',
    stream: stream
  }
})
// api routes
fastify.get('/', { logger: true }, (req, reply) => {
  req.log.info({ loggerMiddleware: 'log here' })
  reply.send({ hello: 'world' })
})

// json requests
fastify.addContentTypeParser('application/json', (req, done) => {
  jsoffParser(req, function (err, body) {
    done(err || body)
  })
})

// all requests
fastify.addContentTypeParser('*', (req, done) => {
  var data = ''
  req.on('data', chunk => { data += chunk })
  req.on('end', () => {
    done(data)
  })
})

// api server
fastify.listen(3000, '127.0.0.1', (err) => {
  if (err) throw err
  console.log(`server has listening on port ${fastify.server.address().port}`)
})
