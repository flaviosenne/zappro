import express from 'express'

const server = express()

const port = process.env.SERVER_PORT || 80

server.listen(port, ()=> console.info(`Server is UP in port: ${port}`))

export { server }