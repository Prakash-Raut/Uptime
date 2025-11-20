import { CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	status: "UP" | "DOWN" | "UNKNOWN";
};

const statusMap = {
	UP: "fill-green-500 text-green-500",
	DOWN: "fill-red-500 text-red-500",
	UNKNOWN: "fill-orange-500 text-orange-500",
};

export function Status({ status }: Props) {
	return (
		<div className="flex items-center">
			{status === "UP" ? (
				<CircleIcon className={cn("size-5 animate-pulse", statusMap[status])} />
			) : status === "DOWN" ? (
				<CircleIcon className={cn("size-5 animate-pulse", statusMap[status])} />
			) : (
				<CircleIcon className={cn("size-5 animate-pulse", statusMap[status])} />
			)}
		</div>
	);
}
