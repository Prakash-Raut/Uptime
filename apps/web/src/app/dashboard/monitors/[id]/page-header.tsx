"use client";

import { formatDistanceToNow } from "date-fns";
import {
	ArrowLeftIcon,
	ExternalLinkIcon,
	GlobeIcon,
	MoreVerticalIcon,
	Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Status } from "@/components/general/status";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMonitor } from "@/features/monitors/hooks/use-monitor";
import { ConfirmDialog } from "./confirm-dialog";

type Props = {
	id: string;
	url: string;
	timeAdded: Date;
	status: "UP" | "DOWN" | "UNKNOWN";
};

export function PageHeader({ id, url, timeAdded, status }: Props) {
	const router = useRouter();
	const deleteMonitor = useDeleteMonitor();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const handleDelete = () => {
		deleteMonitor.mutate(id, {
			onSuccess: () => {
				router.push("/dashboard/monitors");
			},
		});
	};

	return (
		<>
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-start gap-4 flex-1">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => router.push("/dashboard/monitors")}
						className="mt-1"
					>
						<ArrowLeftIcon className="size-4" />
					</Button>
					<div className="flex-1 space-y-2">
						<div className="flex items-center gap-3">
							<Status status={status} />
							<h1 className="font-bold text-3xl">{url}</h1>
						</div>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1.5">
								<GlobeIcon className="size-4" />
								<span>
									{formatDistanceToNow(timeAdded, { addSuffix: true })}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => window.open(url, "_blank")}
					>
						<ExternalLinkIcon className="size-4 mr-2" />
						Visit Site
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<MoreVerticalIcon className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								variant="destructive"
								onClick={() => setShowDeleteDialog(true)}
							>
								<Trash2Icon className="size-4 mr-2" />
								Delete Monitor
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<ConfirmDialog
				open={showDeleteDialog}
				onOpenChange={setShowDeleteDialog}
				onConfirm={handleDelete}
				isLoading={deleteMonitor.isPending}
				destructive={true}
				title="Delete Monitor"
				description={`Are you sure you want to delete this monitor? This action cannot be undone. All monitoring data for ${url} will be permanently deleted.`}
				confirmText="Delete"
				cancelText="Cancel"
			/>
		</>
	);
}
