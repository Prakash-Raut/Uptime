import { Suspense } from "react";
import { CreateMonitorForm } from "./create-form";

export default function Page() {
	return (
		<div className="container mx-auto max-w-3xl space-y-4 pt-4">
			<Suspense fallback={<div>Loading...</div>}>
				<CreateMonitorForm />
			</Suspense>
		</div>
	);
}
