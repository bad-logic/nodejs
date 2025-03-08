import express from "express";

import { todoRouter } from "./todo.routes";
import { healthController } from "../controllers/health.controller";
import { responder } from "../middlewares/responder";

export const router = express();

router.get("/health/", responder(healthController.getSystemHealth));

router.use("/api/todo/",todoRouter);
