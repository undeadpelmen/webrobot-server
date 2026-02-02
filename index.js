import express from 'express'
import {WebSocketServer} from 'ws'
import * as http from "node:http";
import config, {logger} from './config.js'
import handleFunc from "./src/controller/websocketController.js"
import adminRouter from "./src/controller/AdminController.js"
import commandRouter from "./src/controller/CommandController.js"

const app = express()

const server = http.createServer(app)

const wss = new WebSocketServer({ server });

app.get("/ping", (req, res) => {
    logger.info('Pong!')

    res.send("pong")
})

app.use("/admin", adminRouter)

app.use("/robot", commandRouter)

wss.on("connection", handleFunc)

server.listen(config.port, () => {
    logger.info(`Server started on: http://localhost:${config.port}`)
})