"use client";

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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import type { User } from "better-auth";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
	user: User;
};

const formSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email("Invalid email address"),
	phone: z.string(),
});

export function SettingsForm({ user }: Props) {
	const form = useForm({
		defaultValues: {
			name: user.name,
			email: user.email,
			phone: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 500));
				toast.success("Settings saved successfully");
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Account Settings</CardTitle>
				<CardDescription>Basic account information</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					<FieldGroup>
						<form.Field
							name="name"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Name</FieldLabel>
										<FieldContent>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</FieldContent>
									</Field>
								);
							}}
						/>

						<form.Field
							name="email"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
										<FieldContent>
											<Input
												id={field.name}
												name={field.name}
												type="email"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												disabled
												className="bg-muted"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</FieldContent>
									</Field>
								);
							}}
						/>

						<form.Field
							name="phone"
							children={(field) => {
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Phone</FieldLabel>
										<FieldContent>
											<Input
												id={field.name}
												name={field.name}
												type="tel"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="+1 (555) 000-0000"
											/>
										</FieldContent>
									</Field>
								);
							}}
						/>
					</FieldGroup>

					<CardFooter className="flex justify-end px-0 pt-6">
						<Button
							type="submit"
							form="settings-form"
							disabled={form.state.isSubmitting}
						>
							{form.state.isSubmitting ? "Saving..." : "Save changes"}
						</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	);
}
