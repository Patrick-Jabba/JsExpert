const http = require('http');
const DEFAULT_USER = {
  username: 'PatrickMonteiro',
  password: '123'
}
const { once } = require('events');

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end();
  },
  // curl -X POST --data '{"username: "PatrickMonteiro", "password: "123"}' localhost:3000/login
  '/login:post': async (request, response) => {
    const user = JSON.parse(await once(request, "data"))
    const toLower = (text) => text.toLowerCase()
    if( toLower(user.username) !== toLower(DEFAULT_USER.username) || user.password !== DEFAULT_USER.password) {
      response.writeHead(401)
      response.end("Logging has failed!")
      return;
    }

    return response.end("Logging has succeeded!")

    // response é um iterator!
    // for await (const data of request){
    //   const user = JSON.parse(data);
    //   if(user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password){
    //     response.writeHead(401)
    //     response.write("Logging has failed!");
    //     return response.end();
    //   }
    // response.write('Logging has succeeded!')
    // return response.end();
    // }
  },
  
  default: (request, response) => {
    response.writeHead(404)
    return response.end('Not Found!')
  }

}

const handler = function (request, response) {
  const {url, method} = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default
 
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  return chosen(request, response);
}

const app = http.createServer(handler)
                .listen(3000, () => console.log('🔥 app running at', 3000));

module.exports = app;