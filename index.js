import express from 'express'
import ws, {WebSocketServer} from 'ws'
import * as http from "node:http";
import config from './config.js'
import handleFunc from "./src/controller/websocketController.js"

const app = express()

const server = http.createServer(app)

const wss = new WebSocketServer({ server });

const pong = (req, res) => {
    res.send("pong")
}

app.get("/ping", pong)

wss.on("connection", handleFunc)

server.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`)
})