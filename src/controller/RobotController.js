import express from "express";
import {logger} from "../../config.js";
import RobotService from "../service/RobotService.js";

const commandRouter = express.Router();

commandRouter.get("/status", async (req, res) => {
    try {
        const status = RobotService.robotStatusById(parseInt(req.query.robotid))

        res.json({
            id: req.query.robotid,
            status: status,
        })

        logger.info(`robot status: ${status}`);
    }catch (e) {
        logger.error(e);

        res.status(404).send()
    }
})

commandRouter.post("/command", async (req, res) => {
    try {
        RobotService.robotSetCommandById(parseInt(req.query.robotid), req.query.command)

        res.json({
            id: req.query.robotid,
            status: req.query.command,
        })

        logger.info(`robot: ${req.query.robotid}, new status ${req.query.command}`);
    } catch (e) {
        logger.error(e);

        res.status(404).send()
    }
})

export default commandRouter