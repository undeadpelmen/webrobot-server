// import {logger} from "../../config.js";

let RobotMap = new Map()

const validCommand = [
    "forward",
    "backward",
    "stop",
    "left",
    "right",
]

const RobotService = {
    addRobot : (conn, status) => {
        const id = 1

        RobotMap.set(id, {conn: conn, status: status})

        return id
    },

    getRobotById: (id) => {
        return RobotMap.get(id)
    },

    deleteRobotById(id) {
        return RobotMap.delete(id)
    },

    getAllRobots: () => {
        return RobotMap
    },

    robotStatusById: (id) => {
        const robot = RobotMap.get(id)

        if (!robot) {
            throw new Error(`robot not found, id: ${id}`)
        }

        return robot.status
    },

    robotSetCommandById: (id, command) => {
        const robot = RobotMap.get(id)

        if (!robot) {
            throw new Error(`robot not found, id: ${id}`)
        }

        if (!validCommand.includes(command)) {
            throw new Error(`${command} is not valid`)
        }

        robot.conn.send(JSON.stringify({
            type: "command",
            status: command,
            msg: "update command",
        }))
    },
}

export default RobotService