import dotenv from "dotenv";
import path from "node:path";
import { cwd } from "node:process";
import { defineConfig, env } from "prisma/config";

// Load environment variables from server .env file
dotenv.config({
	path: path.join(cwd(), "../../apps/server/.env"),
});

export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: env("DATABASE_URL"),
	},
});
