import logger from "@uptime/logger";
import { createExpressServer } from "./app";

const PORT = 3000;
const server = createExpressServer();

if (process.env.NODE_ENV !== "development") {
	server.listen(PORT, async () => {
		logger.info({ port: PORT }, "🔥API is live");
	});
}

export default server;
