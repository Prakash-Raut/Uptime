"use client";

import { createStatusPage, getStatusPage, getStatusPages } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";
import { statusPagesParams } from "../params";
import type { StatusPage } from "../types";

// Hook to create a monitor
export const useCreateStatusPage = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [params] = useStatusPageParams();

	return useMutation({
		mutationFn: async (input: any) => {
			const { data } = await createStatusPage(input);
			return data;
		},
		onSuccess: (data) => {
			toast.success(`status page ${data.slug} created successfully`);
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

// Hook to get status page params using query states
export const useStatusPageParams = () => {
	return useQueryStates(statusPagesParams);
};

// Hook to fetch multiple status pages using suspense
export const useStatusPages = () => {
	const [params] = useStatusPageParams();
	return useQuery({
		queryKey: ["status-pages", params],
		queryFn: async () => {
			const { data } = await getStatusPages(params);
			return data;
		},
	});
};

// Hook to fetch a single monitor
export const useStatusPage = (id: string) => {
	return useQuery<StatusPage>({
		queryKey: ["status-pages", id],
		queryFn: async () => {
			const { data } = await getStatusPage(id);
			return data;
		},
	});
};
