// import {logger} from "../../config.js";

let websocketMap = new Map()

const WebsocketService = {
    addRobot : (id, conn, status) => {
        websocketMap.set(id, {conn: conn, status: status});
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