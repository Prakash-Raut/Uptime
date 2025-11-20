import logger from "@uptime/logger";
import { createExpressServer } from "./app";

const PORT = 3000;

export const server = createExpressServer();

server.listen(PORT, () => {
	try {
		logger.info("🔥Database connected successfully");
		logger.info({ port: PORT }, "🔥API is live");
	} catch (error) {
		logger.error({ error }, "🩻Error connecting to the database");
		setTimeout(() => {
			process.exit(1);
		}, 1000);
	}
});
