// import {logger} from "../../config.js";

let websocketMap = new Map()

const WebsocketService = {
    addRobot : (conn, status) => {
        const id = 1

        websocketMap.set(id, {conn: conn, status: status})

        return id
    },

    getRobotById: (id) => {
        return websocketMap.get(id)
    },

    deleteRobotById(id) {
        return websocketMap.delete(id)
    },

    getAllRobots: () => {
        return websocketMap
    },
}

export default WebsocketService