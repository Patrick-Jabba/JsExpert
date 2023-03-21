const http = require('http')

const routes = {
  '/customers:get': (request, response) => {
    response.write('customers get')
    return response.end()
  }
}

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
  const chosen = routes[routeKey] || routes.default
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  return chosen(request, response)
}

const app = http.createServer(handler)
  .listen(3000, () => console.log('🔥🔥🔥 running at 3000'))

module.exports = app