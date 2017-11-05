const split = require('split2')
const stream = split(JSON.parse)
let i = 1
const fastify = require('fastify')({
  logger: {
    genReqId: function (req) { return i++ }
  }
})

fastify.get('/', { test: 'logger request' }, function (req, reply) {
  req.log.info({ test: 'Some info about the current request'})
  reply.send({ hello: 'world' })
})

// api server
fastify.listen(3000, '127.0.0.1', (err) => {
  if (err) throw err
  console.log(`server has listening on port ${fastify.server.address().port}`)
})
