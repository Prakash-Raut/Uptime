"use client";

import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getRegions } from "@/lib/api";
import { useCreateMonitor } from "@/features/monitors/hooks/use-monitor";
import type { Region } from "@/features/monitors/types";
import { toast } from "sonner";

const formSchema = z.object({
	url: z.url("Please enter a valid URL"),
	frequency: z.enum(["1m", "5m", "10m"]),
	regionId: z.string(),
});

export function CreateMonitorForm() {
	const { data: regions } = useQuery({
		queryKey: ["regions"],
		queryFn: getRegions,
	});
	const createMonitor = useCreateMonitor();
	const form = useForm({
		defaultValues: {
			url: "https://",
			frequency: "5m",
			regionId: "",
		},
		validators: {
			onSubmit: formSchema,
			onChange: formSchema,
		},
		onSubmit: async ({ value }) => {
			if (!value.regionId) {
				toast.error("Please select a region");
				return;
			}
			createMonitor.mutate(value.url);
		},
	});

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Create Monitor</CardTitle>
				<CardDescription>
					Create a new monitor to track the availability of your website.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					id="create-monitor-form"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="space-y-4"
				>
					<FieldGroup>
						<form.Field
							name="url"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Url to monitor</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											autoComplete="off"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
					<FieldGroup>
						<form.Field
							name="frequency"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Check Interval</FieldLabel>
										<RadioGroup
											name={field.name}
											value={field.state.value}
											onValueChange={field.handleChange}
											className="flex items-center gap-2"
										>
											{["1m", "5m", "10m"].map((f) => (
												<FieldLabel
													key={f}
													htmlFor={`form-tanstack-radiogroup-${f}`}
												>
													<Field
														orientation="horizontal"
														data-invalid={isInvalid}
													>
														<FieldContent>
															<FieldTitle>{f}</FieldTitle>
														</FieldContent>
														<RadioGroupItem
															value={f}
															id={`form-tanstack-radiogroup-${f}`}
															aria-invalid={isInvalid}
														/>
													</Field>
												</FieldLabel>
											))}
										</RadioGroup>
									</Field>
								);
							}}
						/>
					</FieldGroup>
					<FieldGroup>
						<form.Field
							name="regionId"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Choose a region
										</FieldLabel>
										<RadioGroup
											name={field.name}
											value={field.state.value}
											onValueChange={field.handleChange}
											className="flex items-center gap-2"
										>
											{regions?.data.map((r: Region) => (
												<FieldLabel
													key={r.id}
													htmlFor={`form-tanstack-radiogroup-${r.id}`}
												>
													<Field
														orientation="horizontal"
														data-invalid={isInvalid}
													>
														<FieldContent>
															<FieldTitle>{r.name}</FieldTitle>
														</FieldContent>
														<RadioGroupItem
															value={r.id}
															id={`form-tanstack-radiogroup-${r.id}`}
															aria-invalid={isInvalid}
														/>
													</Field>
												</FieldLabel>
											))}
										</RadioGroup>
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation="horizontal" className="flex justify-end">
					<Button
						type="submit"
						form="create-monitor-form"
						disabled={form.state.isSubmitting}
					>
						{form.state.isSubmitting ? "Creating..." : "Create monitor"}
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
