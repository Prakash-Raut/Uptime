import { requireAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { handler } from "@/utils";
import logger from "@uptime/logger";
import { Router } from "express";
import { MonitorController } from "./MonitorController";
import { MonitorService } from "./MonitorService";
import { monitorSchema } from "./monitor-schema";

const monitorRouter: Router = Router();
const monitorService = new MonitorService();
const monitorController = new MonitorController(monitorService, logger);

monitorRouter.use(requireAuth);

monitorRouter.post(
	"/",
	validate(monitorSchema),
	handler(monitorController.createMonitor),
);

monitorRouter.get("/", handler(monitorController.getMonitors));

monitorRouter.get("/:id", handler(monitorController.getMonitorById));

monitorRouter.patch(
	"/:id",
	validate(monitorSchema.partial()),
	handler(monitorController.updateMonitor),
);

monitorRouter.get("/:id/status", handler(monitorController.getMonitorStatus));

export { monitorRouter };
