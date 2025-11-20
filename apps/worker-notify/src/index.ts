import db from "@uptime/db";
import { MONITOR_STATUS_UPDATE_QUEUE } from "@uptime/redis-client";
import { Worker } from "bullmq";

const worker = new Worker(
	MONITOR_STATUS_UPDATE_QUEUE,
	async (job) => {
		const { monitorId, status, responseTimeMs, regionId } = job.data;

		await db.tick.create({
			data: {
				monitorId,
				status,
				responseTimeMs,
				regionId,
			},
		});
	},
	{
		concurrency: 5, // run 5 checks at a time
		connection: {
			url: process.env.REDIS_URL,
		},
	},
);

worker.on("active", () => {
	console.log("✅ Notify Worker is active", worker.id);
});
worker.on("completed", (job) => {
	console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
	console.log(`❌ Job ${job?.id} failed`, error);
});
