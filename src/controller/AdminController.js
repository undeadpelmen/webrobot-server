import express from "express";
import {logger} from "../../config.js";
import RobotService from "../service/RobotService.js";


const adminRouter = express.Router();

adminRouter.get("/robot/connected", async (req, res) => {
    const map = RobotService.getAllRobots()

    map.forEach((robot, id, mp) => {
        mp.set(id, {status: robot.status});
    })

    const data = Object.fromEntries(map)

    logger.info(data)

    res.send(JSON.stringify(data))
})

export default adminRouter;
