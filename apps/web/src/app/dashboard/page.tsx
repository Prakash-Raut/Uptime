import { requireAuth } from "@/lib/auth-util";

export default async function DashboardPage() {
	await requireAuth();
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<h1>Home</h1>
		</div>
	);
}
