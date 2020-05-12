const http = require('http')
const server = http.createServer((req, res) => {
  console.log(req.headers)
  res.setHeader('Content-type', 'text/html')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, { 'Content-type': 'text/plan' })
  res.end('ok')
})
server.listen(8088)
