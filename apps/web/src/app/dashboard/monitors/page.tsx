import {
	MonitorContainer,
	MonitorList
} from "@/features/monitors/component/monitor";
import { requireAuth } from "@/lib/auth-util";
import { Suspense } from "react";

export default function Page() {
	requireAuth();

	return (
		<MonitorContainer>
			<Suspense fallback={<div>Loading...</div>}>
				<MonitorList />
			</Suspense>
		</MonitorContainer>
	);
}
