import express from "express";
import { getTestController } from "../controllers/testController.js";

//router object
const router = express.Router();

//routes
router.get("/", getTestController);

export default router;
