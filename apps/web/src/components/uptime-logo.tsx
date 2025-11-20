import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
	className?: string;
};

export function UptimeLogo({ className }: Props) {
	return (
		<Image
			src="/uptime-logo-light.svg"
			alt="Uptime"
			width={32}
			height={32}
			className={cn("size-8", className)}
		/>
	);
}
