"use client";

import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteUser } from "./delete-user";
import { SettingsForm } from "./form";

export default function SettingsView() {
	const { data: session } = authClient.useSession();
	const user = session?.user;

	const deleteUserMutation = useMutation({
		mutationFn: async () => {
			const { data } = await authClient.deleteUser();
			return data;
		},
		onSuccess: () => {
			toast.success("Account deleted successfully");
		},
		onError: () => {
			toast.error("Failed to delete account");
		},
	});

	if (!user) {
		return <Loader2 className="animate-spin" />;
	}

	return (
		<div className="container mx-auto max-w-4xl space-y-6 py-6">
			<div>
				<h1 className="text-3xl font-bold">Settings</h1>
				<p className="text-muted-foreground mt-2 text-sm">
					Manage your account settings and preferences
				</p>
			</div>

			{user && <SettingsForm user={user} />}

			{user && (
				<DeleteUser
					onDelete={deleteUserMutation.mutate}
					isDeleting={deleteUserMutation.isPending}
				/>
			)}

			<Card>
				<CardContent>
					<div className="flex flex-col gap-2">
						<p className="text-sm font-medium">
							Need help configuring your account?
						</p>
						<p className="text-muted-foreground text-sm">
							Let us know at{" "}
							<a
								href="mailto:support@uptime.com"
								className="text-primary hover:underline"
							>
								support@uptime.com
							</a>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
