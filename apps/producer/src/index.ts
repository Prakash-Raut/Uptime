import db from "@uptime/db";
import { monitorCheckQueue } from "@uptime/redis-client";

const fetchMonitors = async () => {
	return await db.monitor.findMany({
		select: {
			id: true,
			url: true,
		},
	});
};

const fetchRegions = async () => {
	return await db.region.findMany({
		select: {
			id: true,
			name: true,
		},
	});
};

const enqueueChecks = async () => {
	const [monitors, regions] = await Promise.all([
		fetchMonitors(),
		fetchRegions(),
	]);

	for (const region of regions) {
		const jobs = monitors.map((monitor) => ({
			name: "check",
			data: {
				...monitor,
				regionId: region.id,
			},
			opts: {
				attempts: 3,
				backoff: { type: "exponential", delay: 2000 },
				removeOnComplete: 100,
				removeOnFail: 50,
			},
		}));

		await monitorCheckQueue.addBulk(jobs);
		console.log(
			"Produced jobs for url in region",
			region.name,
			monitors.map((monitor) => monitor.url),
		);
	}
};

async function main() {
	await enqueueChecks();

	setInterval(
		async () => {
			await enqueueChecks();
		},
		1000 * 60 * 1, // 1 minute
	);
}

main().catch(console.error);
