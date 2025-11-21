import logger from "@uptime/logger";
import { createExpressServer } from "./app";

const PORT = 3000;

export const server = createExpressServer();

// Vercel serverless functions require an exported handler, not a listening server
// Export the Express app as the default export for Vercel
export default server;

// Local development: only listen on a port if not on Vercel
if (!process.env.VERCEL) {
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
}
