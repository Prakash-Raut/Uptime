"use client";

import Image from "next/image";

const features = [
	{
		id: 1,
		category: "Real-Time Monitoring",
		title: "Monitor websites, APIs, and servers 24/7",
	},
	{
		id: 2,
		category: "Instant Alerts",
		title: "Get notified the moment downtime happens",
	},
	{
		id: 3,
		category: "Comprehensive Reporting",
		title: "Analyze incidents and uptime trends easily",
	},
];

export default function Features() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<p className="font-medium text-green-400 text-lg uppercase">
					What we can do for you
				</p>
				<h2 className="text-center font-semibold text-5xl">
					Catch downtime before your users do
				</h2>
				<div className="flex w-full items-center justify-center">
					<div className="mx-auto mt-8 w-full space-y-20 md:mt-16">
						{features.map((feature) => (
							<div
								key={feature.id}
								className="flex flex-col items-center gap-x-12 gap-y-6 md:flex-row md:even:flex-row-reverse"
							>
								<div className="aspect-4/3 w-full rounded-xl">
									<Image
										src="/cta.jpg"
										alt={feature.title}
										width={1000}
										height={1000}
										className="rounded-xl object-cover"
									/>
								</div>

								<div className="shrink-0 basis-1/2">
									<span className="font-medium text-green-400 text-lg uppercase">
										{feature.category}
									</span>
									<h4 className="my-3 font-medium text-5xl tracking-tight">
										{feature.title}
									</h4>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
