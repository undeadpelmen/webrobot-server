import express from "express";
import {logger} from "../../config.js";
import WebsocketService from "../service/websocketService.js";

const commandRouter = express.Router();

commandRouter.get("/status/:robotId", async (req, res) => {
    let robot = WebsocketService.getRobotById(parseInt(req.params.robotId))

    if (!robot) {
        res.status(404).send("Not Found");

        logger.info(`Robot not found: id: ${req.params.robotId}, robot=${robot}`);

        return
    }

    res.json({
        id: req.params.robotId,
        status: robot.status,
    })

    logger.info(`robot status: ${robot.status}`);
})

export default commandRouter