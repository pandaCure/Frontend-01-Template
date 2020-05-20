/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-param-reassign */
const net = require('net')
const parser = require('./parser')
class Request {
  constructor(options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.path = options.path || '/'
    this.port = options.port || 80
    this.body = options.body || {}
    this.headers = options.headers || {}
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (
      this.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
        .join('&')
    }
    this.headers['Content-Length'] = this.bodyText.length
  }
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers)
      .map((key) => `${key}: ${this.headers[key]}`)
      .join('\r\n')}\r\n\r\n${this.bodyText}`
  }
  open(method, url) {}
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser()
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection(
          { host: this.host, port: this.port },
          () => {
            connection.write(this.toString())
          }
        )
      }
      connection.on('data', (data) => {
        parser.receive(data.toString())
        if (parser.isFinished) {
          resolve(parser.response)
        }
        // console.log(parser.header)
        // console.log(parser.statusLine)
        // console.log(data.toString())
        // resolve(data.toString())
        connection.end()
      })
      connection.on('error', (err) => {
        reject(err)
      })
    })
  }
}
class Response {}
class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7
    this.currentStatus = this.WAITING_STATUS_LINE
    this.statusLine = ''
    this.header = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyparser = null
  }
  get isFinished() {
    return this.bodyparser && this.bodyparser.isFinished
  }
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.header,
      body: this.bodyparser.content.join('')
    }
  }
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i))
    }
  }
  receiveChar(char) {
    if (this.currentStatus === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.currentStatus = this.WAITING_HEADER_LINE_END
      }
      if (char === '\n') {
        this.currentStatus = this.WAITING_HEADER_NAME
      } else {
        this.statusLine += char
      }
    } else if (this.currentStatus === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.currentStatus = this.WAITING_HEADER_NAME
      }
    } else if (this.currentStatus === this.WAITING_HEADER_NAME) {
      //   console.log(char)
      if (char === ':') {
        this.currentStatus = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.currentStatus = this.WAITING_HEADER_BLOCK_END
        // console.log(this.header)
        if (this.header['Transfer-Encoding'] === 'chunked')
          this.bodyparser = new TrunkedBodyParser()
      } else {
        this.headerName += char
      }
    } else if (this.currentStatus === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.currentStatus = this.WAITING_HEADER_VALUE
      }
    } else if (this.currentStatus === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.currentStatus = this.WAITING_STATUS_LINE_END
        this.header[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.currentStatus === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.currentStatus = this.WAITING_HEADER_NAME
      }
    } else if (this.currentStatus === this.WAITING_BODY) {
      this.bodyparser.receiveChar(char)
    } else if (this.currentStatus === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.currentStatus = this.WAITING_BODY
      }
    }
  }
}
class TrunkedBodyParser {
  constructor() {
    this.WATING_LENGTH = 0
    this.WAITING_LENGTH_LINE_END = 1
    this.READING_TRUNK = 2
    this.WAITING_NEW_LINE = 3
    this.WAITING_NEW_LINE_END = 4
    this.length = 0
    this.content = []
    this.current = this.WATING_LENGTH
    this.isFinished = false
  }
  receiveChar(char) {
    // console.log(JSON.stringify(char))
    if (this.current === this.WATING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          // console.log(this.content)
          this.isFinished = true
        }
        this.current = this.WAITING_LENGTH_LINE_END
      } else {
        this.length *= 16
        this.length += parseInt(char, 16)
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK
      }
    } else if (this.current === this.READING_TRUNK) {
      // console.log(char)
      this.content.push(char)
      this.length--
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WATING_LENGTH
      }
    }
  }
}
void (async function () {
  let request = new Request({
    method: 'POST',
    port: 8088,
    host: '127.0.0.1',
    body: {
      name: 'winter'
    },
    path: '/',
    headers: {
      'X-Foo2': 'customed'
    }
  })
  let response = await request.send()
  let dom = parser.parseHTML(response.body)
})()

// const clent = net.createConnection({ host: '127.0.0.1', port: 8088 }, () => {
//   let request = new Request({
//     method: 'POST',
//     port: 8088,
//     host: '127.0.0.1',
//     body: {
//       name: 'winter'
//     },
//     path: '/',
//     headers: {
//       ['X-Foo2']: 'customed'
//     }
//   })
//   clent.write(request.toString())
//   //   console.log(request.toString())
//   //   clent.write(`POST / HTTP/1.1\r\n`)
//   //   clent.write(`Host: 127.0.0.1\r\n`)
//   //   clent.write(`Content-Length: 20\r\n`)
//   //   clent.write(`Content-type: application/x-www-form-urlencoded\r\n`)
//   //   clent.write(`\r\n`)
//   //   clent.write('filed1=aaa&code=x%3D1\r\n')
//   //   clent.write(`\r\n`)
// })
// clent.on('data', (data) => {
//   console.log(data.toString())
//   clent.end()
// })
// clent.on('end', () => {
//   console.log('disconnect')
// })
