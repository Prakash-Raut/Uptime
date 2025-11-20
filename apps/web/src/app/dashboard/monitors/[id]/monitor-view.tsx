"use client";

import { MetricCard } from "@/components/general/metric-card";
import {
	useMonitor,
	useMonitorStatus,
} from "@/features/monitors/hooks/use-monitor";
import { covertTimeFormat } from "@/lib/utils";
import { RegionStatusLineChart } from "./graph";
import { PageHeader } from "./page-header";

type Props = {
	id: string;
};

export function MonitorView({ id }: Props) {
	const { data } = useMonitor(id);
	const { data: statusData } = useMonitorStatus(id);

	if (!data) return null;
	if (!statusData) return null;

	return (
		<div className="container mx-auto space-y-6 pt-6 pb-12">
			<PageHeader
				id={id}
				url={data.url}
				timeAdded={data.createdAt}
				status={statusData.currentStatus as "UP" | "DOWN" | "UNKNOWN"}
			/>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<MetricCard
					title="Uptime"
					value={covertTimeFormat(statusData.currentlyUpSince)}
				/>
				<MetricCard
					title="Last Checked At"
					value={covertTimeFormat(statusData.lastCheckedAt)}
				/>
				<MetricCard title="Incidents" value={statusData.incidents} />
			</div>

			<RegionStatusLineChart />
		</div>
	);
}
