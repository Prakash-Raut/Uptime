import axios from "axios";

// Axios api client
export const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// API for monitors
export const createMonitor = async (data: any) => {
	return api.post("/monitors", data);
};

export const getMonitors = async (params: any) => {
	return api.get("/monitors", { params });
};

export const getMonitor = async (id: string) => {
	return api.get(`/monitors/${id}`);
};

export const deleteMonitor = async (id: string) => {
	return api.delete(`/monitors/${id}`);
};

export const updateMonitor = async (id: string, data: any) => {
	return api.put(`/monitors/${id}`, data);
};

//  API for regions
export const getRegions = async () => {
	return api.get("/regions");
};

// API for website status
export const getMonitorStatus = async (id: string) => {
	return api.get(`/monitors/${id}/status`);
};

// API for status pages
export const createStatusPage = async (data: any) => {
	return api.post("/status-pages", data);
};

export const getStatusPages = async (params: any) => {
	return api.get("/status-pages", { params });
};

export const getStatusPage = async (id: string) => {
	return api.get(`/status-pages/${id}`);
};
