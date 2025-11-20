import { auth } from "@uptime/auth";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import "dotenv/config";
import type { Express } from "express";
import express from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { loggerMiddleware } from "./middlewares/logger";
import { v1Router } from "./routes/v1";

export const createExpressServer = () => {
	const app: Express = express();

	app
		.disable("x-powered-by")
		.use(express.static("public"))
		.use(
			cors({
				origin: process.env.CORS_ORIGIN || "",
				methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
				allowedHeaders: ["Content-Type", "Authorization"],
				credentials: true,
			}),
		)
		.all("/api/auth{/*path}", toNodeHandler(auth))
		.use(express.json())
		.use(loggerMiddleware)
		.get("/", (_req, res) => {
			res.status(200).send("OK");
		})
		.get("/error", () => {
			throw new Error("Test error");
		})
		.use("/api/v1", v1Router)
		.use(globalErrorHandler);

	return app;
};
