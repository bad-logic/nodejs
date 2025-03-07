import express from "express";
import { todoRouter } from "./todo.routes";
import { categoryRouter } from "./category.routes";
import { meta } from "@utils/meta";

export const router = express();

router.get("/health", (_req, res, _next) => {
  res.status(200).json({
    ...meta,
    status: "OK",
  });
});

router.use("/api/todo/",todoRouter);
router.use("/api/category/",categoryRouter);
