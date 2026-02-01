import WebsocketService from "../service/websocketService.js";
import websocketService from "../service/websocketService.js";
import {logger} from "../../config.js";

const HandleFunc = (ws) => {
    ws.on("error", (err) => {
        console.error(err)
    })

    ws.on("close", () => {
        console.log("WebSocket closed")
    })

    ws.on("message", (msg) => {
        try {
            let data = JSON.parse(msg.toString())

            switch (data.type) {
                case "init":
                    WebsocketService.addRobot(1, ws, data.status)

                    ws.send(JSON.stringify({
                        status: "success",
                        id: 1,
                    }))

                    logger.info("connect new robot")

                    break
                case "status":
                    let robot = websocketService.getRobotById(data.id)

                    if (!robot) {
                        logger.error(`robot not found: ${data.id}`)

                        ws.send(JSON.stringify({
                            status: "error",
                            error: "unrecognized robot",
                        }))

                        return
                    }

                    robot.status = data.status

                    ws.send(JSON.stringify({
                        status: "success",
                        id: data.id,
                    }))

                    logger.info(`robot status: ${data.status}, id: ${data.id}`)

                    break
                case "error":
                    logger.error(`robot error: ${data.error}`)
                    break
            }
        } catch (e) {
            ws.send(JSON.stringify({
                status: "error",
                error: e
            }))

            console.error(e)
        }
    })
}

export default HandleFunc