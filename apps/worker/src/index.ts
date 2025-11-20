import { monitorStatusUpdateQueue } from "@uptime/redis-client";
import { Worker } from "bullmq";
import https from "node:https";

const QUEUE_NAME = "monitor-check";

const worker = new Worker(
	QUEUE_NAME,
	async (job) => {
		const { id, url, regionId } = job.data;

		const startTime = Date.now();

		return new Promise<void>((resolve, _reject) => {
			https
				.get(url, async () => {
					const endTime = Date.now();

					await monitorStatusUpdateQueue.add("update", {
						monitorId: id,
						status: "UP",
						responseTimeMs: endTime - startTime,
						regionId,
					});

					console.log(`✅ Website ${url} is up`);
					resolve();
				})
				.on("error", async () => {
					const endTime = Date.now();

					await monitorStatusUpdateQueue.add("update", {
						monitorId: id,
						status: "DOWN",
						responseTimeMs: endTime - startTime,
						regionId,
					});

					console.log(`❌ Website ${url} is down`);
					resolve();
				});
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
	console.log("✅ Worker is active", worker.id);
});

worker.on("completed", (job) => {
	console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
	console.log(`❌ Job ${job?.id} failed`, error);
});
