import {
	StatusPageContainer,
	StatusPageList,
} from "@/features/status-pages/components/status-page";
import { requireAuth } from "@/lib/auth-util";
import { Suspense } from "react";

export default function Page() {
	requireAuth();

	return (
		<StatusPageContainer>
			<Suspense fallback={<div>Loading...</div>}>
				<StatusPageList />
			</Suspense>
		</StatusPageContainer>
	);
}
