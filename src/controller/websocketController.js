import WebsocketService from "../service/websocketService.js";
import websocketService from "../service/websocketService.js";
import {logger} from "../../config.js";

/*
ROBOT DTO
{
    "type": type of message (syn, status, error)
    "id": robot's id
    "status" current robot status
    "msg": message or error from robot
}

SERVER DTO
{
    "type": type of message (ack, response, command, offsig)
    "status": success or error
    "msg": message or error
}
 */

const HandleFunc = (ws) => {
    ws.on("error", (err) => {
        logger.error(err)
    })

    ws.on("close", () => {
        logger.info("websocket closed")
    })

    ws.on("message", (msg) => {
        try {
            let data = JSON.parse(msg.toString())

            switch (data.type) {
                case "syn":
                    const id = WebsocketService.addRobot( ws, data.status)

                    ws.send(JSON.stringify({
                        type: "ack",
                        status: "success",
                        id: id,
                    }))

                    logger.info("connect new robot")

                    break
                case "status":
                    let robot = websocketService.getRobotById(data.id)

                    if (!robot) {
                        logger.error(`robot not found: ${data.id}`)

                        ws.send(JSON.stringify({
                            status: "error",
                            msg: "unrecognized robot",
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
                    logger.error(`robot error: ${data.msg}`)
                    break
            }
        } catch (e) {
            ws.send(JSON.stringify({
                status: "error",
                msg: e
            }))

            logger.error(`Unhandled error: ${e}`)
        }
    })
}

export default HandleFunc