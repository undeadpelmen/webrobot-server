import express from "express";
import {logger} from "../../config.js";
import WebsocketService from "./../service/websocketService.js";


const adminRouter = express.Router();

adminRouter.get("/robot/connected", async (req, res) => {
    const map = WebsocketService.getAllRobots()

    map.forEach((robot, id, mp) => {
        mp.set(id, {status: robot.status});
    })

    const data = Object.fromEntries(map)

    logger.info(data)

    res.send(JSON.stringify(data))
})

export default adminRouter;
