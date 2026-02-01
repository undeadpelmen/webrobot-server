let websocketMap = new Map()

const WebsocketService = {
    addRobot : (id, conn, status) => {
        websocketMap.set(id, {conn: conn, status: status});
    },

    getRobotById: (id) => {
        return websocketMap.get(id)
    }
}

export default WebsocketService