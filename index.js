const fastify = require('fastify')()

// API Routes
fastify.get('/', function (req, reply) {
  reply.send({ hello: 'world' })
})

// Server
fastify.listen(3000, (err) => {
  if (err) throw err
  console.log(`server has listening on port ${fastify.server.address().port}`)
})
