import { Queue } from "bullmq";
import { createClient, type RedisClientType } from "redis";

export const MONITOR_CHECK_QUEUE = "monitor-check";
export const MONITOR_STATUS_UPDATE_QUEUE = "monitor-status-update";

let client: RedisClientType | null = null;

const REDIS_URL = process.env.REDIS_URL;

export const getRedisClient = async (): Promise<RedisClientType> => {
	if (client) return client;

	client = createClient({
		url: REDIS_URL,
	});

	client.on("error", (err) => {
		throw err;
	});

	if (!client.isOpen) {
		await client.connect();
		console.log("✅ Redis connected");
	}

	return client;
};

export const monitorCheckQueue = new Queue(MONITOR_CHECK_QUEUE, {
	connection: {
		url: REDIS_URL,
	},
});

export const monitorStatusUpdateQueue = new Queue(MONITOR_STATUS_UPDATE_QUEUE, {
	connection: {
		url: REDIS_URL,
	},
});
