const fastify = require('fastify')()
// api routes
fastify.get('/', function (req, reply) {
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
