import WebsocketService from "../service/websocketService.js";
import websocketService from "../service/websocketService.js";

const HandleFunc = (ws) => {
    ws.on("error", (err) => {
        console.error(err)
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
                    break
                case "status":
                    let robot = websocketService.getRobotById(data.id)

                    if (!robot) {
                        console.error("unrecognized robot")

                        ws.send(JSON.stringify({
                            status: "error",
                            error: "unrecognized robot",
                        }))
                    }

                    robot.status = data.status

                    ws.send(JSON.stringify({
                        status: "success",
                        id: data.id,
                    }))

                    console.log(`robot status: ${data.status}, id: ${data.id}`)

                    break
                case "error":
                    console.error(msg)
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