"use client";

import { LockIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";

export default function HowItWorks() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<div className="flex flex-wrap items-center justify-center gap-4">
					<Badge
						variant="outline"
						className="border-green-300 px-4 py-1.5 text-lg"
					>
						<LockIcon className="text-black" />
						GDPR
					</Badge>
					<Badge
						variant="outline"
						className="border-green-300 px-4 py-1.5 text-lg"
					>
						<LockIcon className="text-black" />
						SOC2
					</Badge>
					<Badge
						variant="outline"
						className="border-green-300 px-4 py-1.5 text-lg"
					>
						<LockIcon className="text-black" />
						ISO 27001
					</Badge>
				</div>
				<h2 className="max-w-4xl text-center font-semibold text-4xl">
					Close your leads when the intent is at its highest with 24/7
					hyper-personalized monitoring.
				</h2>
				<div className="flex w-full items-center justify-center">
					<Image
						src="/demo.png"
						alt="How it works"
						width={1000}
						height={1000}
						className="rounded-xl object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
