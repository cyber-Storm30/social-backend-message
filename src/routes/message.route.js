import express from "express";
import MessageController from "../controllers/message.controller.js";
const router = express.Router();

router.post("/", MessageController.sendMessage);
router.get("/:id", MessageController.getAllMessages);

export default router;
