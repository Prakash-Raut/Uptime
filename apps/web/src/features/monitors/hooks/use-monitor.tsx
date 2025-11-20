"use client";

import {
	createMonitor,
	deleteMonitor,
	getMonitor,
	getMonitorStatus,
	getMonitors,
	updateMonitor,
} from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";
import { monitorsParams } from "../params";
import type { Monitor } from "../types";

// Hook to create a monitor
export const useCreateMonitor = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [params] = useMonitorParams();

	return useMutation({
		mutationFn: async (url: string) => {
			const { data } = await createMonitor({ url });
			return data;
		},
		onSuccess: (data) => {
			toast.success(`monitor ${data.url} created successfully`);
			router.push(`/dashboard/monitors/${data.id}`);
			queryClient.invalidateQueries({ queryKey: ["monitors", params] });
		},
		onError: (error) => {
			toast.error(
				`Failed to create monitor. Please try again., ${error.message}`,
			);
		},
	});
};

// Hook to get monitor params using query states
export const useMonitorParams = () => {
	return useQueryStates(monitorsParams);
};

// Hook to fetch multiple monitors using suspense
export const useMonitors = () => {
	const [params] = useMonitorParams();
	return useQuery({
		queryKey: ["monitors", params],
		queryFn: async () => {
			const { data } = await getMonitors(params);
			return data;
		},
	});
};

// Hook to fetch a single monitor
export const useMonitor = (id: string) => {
	return useQuery<Monitor>({
		queryKey: ["monitors", id],
		queryFn: async () => {
			const { data } = await getMonitor(id);
			return data;
		},
	});
};

// Hook to update a monitor
export const useUpdateMonitor = () => {
	const queryClient = useQueryClient();
	const [params] = useMonitorParams();
	return useMutation({
		mutationFn: async (input: Monitor) => {
			const { data } = await updateMonitor(input.id, input);
			return data;
		},
		onSuccess: (data) => {
			toast.success(`monitor ${data.url} updated`);
			queryClient.invalidateQueries({ queryKey: ["monitors", params] });
		},
		onError: (error) => {
			toast.error(`Failed to update monitor. ${error.message}`);
		},
	});
};

// Hook to delete a monitor
export const useDeleteMonitor = () => {
	const queryClient = useQueryClient();
	const [params] = useMonitorParams();

	return useMutation({
		mutationFn: async (id: string) => {
			const { data } = await deleteMonitor(id);
			return data;
		},
		onSuccess: (data) => {
			toast.success(`monitor ${data.id} removed`);
			queryClient.invalidateQueries({ queryKey: ["monitors", params] });
		},
		onError: (error) => {
			toast.error(`Failed to delete monitor. ${error.message}`);
		},
	});
};

// Hook to fetch website status
export const useMonitorStatus = (id: string) => {
	return useQuery({
		queryKey: ["monitor-status", id],
		queryFn: async () => {
			const { data } = await getMonitorStatus(id);
			return data;
		},
	});
};
