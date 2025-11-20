"use client";

import {
	EntityContainer,
	EntityEmptyView,
	EntityErrorView,
	EntityHeader,
	EntityItem,
	EntityList,
	EntityLoadingView,
	EntityPagination,
	EntitySearch,
} from "@/components/general/entity";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { MonitorIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import {
	useDeleteMonitor,
	useMonitorParams,
	useMonitors,
} from "../hooks/use-monitor";
import type { Monitor } from "../types";

export const MonitorsHeader = () => {
	const router = useRouter();
	return (
		<EntityHeader
			title="Monitors"
			description="Create and manage your monitors"
			onCreate={() => router.push("/dashboard/monitors/new")}
			createButtonLabel="New Monitor"
		/>
	);
};

export const MonitorSearch = () => {
	const [params, setParams] = useMonitorParams();
	const { searchValue, onSearchChange } = useEntitySearch({
		params,
		setParams,
	});
	return (
		<EntitySearch
			value={searchValue}
			onChange={onSearchChange}
			placeholder="Search monitors"
		/>
	);
};

export const MonitorPagination = () => {
	const { data: monitors, isFetching } = useMonitors();
	const [params, setParams] = useMonitorParams();

	if (!monitors) return null;

	return (
		<EntityPagination
			page={monitors.page}
			totalPages={monitors.total}
			onPageChange={(page) => {
				setParams({ ...params, page });
			}}
			disabled={isFetching}
		/>
	);
};

export const MonitorContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<EntityContainer
			header={<MonitorsHeader />}
			search={
				<Suspense fallback={null}>
					<MonitorSearch />
				</Suspense>
			}
			pagination={
				<Suspense fallback={null}>
					<MonitorPagination />
				</Suspense>
			}
		>
			{children}
		</EntityContainer>
	);
};

export const MonitorEmpty = () => {
	const router = useRouter();

	return (
		<EntityEmptyView
			message="You haven't created any monitors yet. Get started by creating your first monitor."
			onNew={() => router.push("/dashboard/monitors/new")}
		/>
	);
};

export const MonitorList = () => {
	const { data } = useMonitors();
	if (!data) return null;
	return (
		<EntityList
			items={data}
			getKey={(monitor: Monitor) => monitor.id}
			renderItem={(monitor: Monitor) => <MonitorItem monitor={monitor} />}
			emptyView={<MonitorEmpty />}
		/>
	);
};

export const MonitorItem = ({ monitor }: { monitor: Monitor }) => {
	const removeMonitor = useDeleteMonitor();

	const handleRemove = () => {
		removeMonitor.mutate(monitor.id);
	};

	return (
		<EntityItem
			href={`/dashboard/monitors/${monitor.id}`}
			title={monitor.url}
			image={
				<div className="flex justify-center items-center size-8">
					<MonitorIcon className="size-5 text-muted-foreground" />
				</div>
			}
			onRemove={handleRemove}
			isRemoving={removeMonitor.isPending}
		/>
	);
};

export const MonitorLoading = () => {
	return <EntityLoadingView message="Loading monitors..." />;
};

export const MonitorError = () => {
	return (
		<EntityErrorView message="An error occurred while loading monitors. Please try again later." />
	);
};
