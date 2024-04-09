#!/usr/bin/env node

const fs    = require('fs')
const path  = require('path')
const http  = require('http')
const https = require('https')
const { WebSocketServer } = require("ws")
const {
  WebSocketNetworkServer,
} = require("../build/commonjs/src/web_socket_network_server")

const host       = process.env.HOST || "localhost"
const port       = process.env.PORT || 3001
const CERTPrefix = process.env.CERT || ''

console.clear()

let KeyFilePath, CERTFilePath
if (CERTPrefix !== '') {
  KeyFilePath = CERTPrefix + '.key'
  if (! fs.existsSync(KeyFilePath)) {
    console.error('no key file at "' + KeyFilePath + '"')
    process.exit(1)
  }

  CERTFilePath = CERTPrefix + '.crt'
  if (! fs.existsSync(CERTFilePath)) {
    console.error('no cert file at "' + CERTFilePath + '"')
    process.exit(1)
  }
}

let server
if (CERTPrefix === '') {
  server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('collabs-ws-server')
  })
} else {
  server = https.createServer({
    key:  fs.readFileSync(KeyFilePath),
    cert: fs.readFileSync(CERTFilePath)
  }, (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('collabs-ws-server')
  })
}

const wss = new WebSocketServer({ server })
new WebSocketNetworkServer(wss)

server.listen(port, host, () => {
  if (CERTPrefix === '') {
  	console.log(`collabs-ws-server running at http://${host}:${port}/`)
  } else {
  	console.log(`collabs-ws-server running at https://${host}:${port}/`)
  }
})
