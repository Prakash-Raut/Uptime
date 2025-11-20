"use client";

export default function MoreFeatures() {
	return (
		<section className="w-full border-b">
			<div className="container mx-auto flex max-w-6xl flex-col items-center space-y-10 border-x px-8 py-5">
				<div
					className="justify-left flex h-[350px] w-full items-center rounded-xl bg-gray-100 pl-10"
					style={{
						backgroundImage: "url('/cta.jpg')",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="space-y-4">
						<h3 className="font-semibold text-5xl">Smart Automated Checks</h3>
						<p className="max-w-md">
							Proactively catch downtime with intelligent monitoring and
							lightning-fast notifications—before your users even notice.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
