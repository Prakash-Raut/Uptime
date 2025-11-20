export type Region = {
	id: string;
	name: string;
};

export type Monitor = {
	id: string;
	url: string;
	userId: string;
	ticks: Tick[];
	createdAt: Date;
	updatedAt: Date;
};

export type Tick = {
	id: string;
	responseTimeMs: number;
	status: "UP" | "DOWN" | "UNKNOWN";
	regionId: string;
	region: Region;
	websiteId: string;
};

export type GetMonitorsResponse = {
	websites: Monitor[];
	total: number;
	page: number;
	pageSize: number;
};
