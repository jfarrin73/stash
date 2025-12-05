"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInWithEmail, signInWithOAuth } from "@/lib/auth";
import { type LoginFormValues, loginSchema } from "@/lib/validation";

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: LoginFormValues) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await signInWithEmail(values);
			if (response.success) {
				// TODO: Handle successful login (redirect, store token, etc.)
				console.log("Login successful:", response.data);
			} else {
				setError(response.error || "Login failed");
			}
		} catch (err) {
			setError("An error occurred during login");
		} finally {
			setIsLoading(false);
		}
	};

	const handleOAuthSignIn = async (provider: "github" | "google") => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await signInWithOAuth(provider);
			if (response.success) {
				// TODO: Handle successful OAuth login
				console.log(`${provider} login successful:`, response.data);
			} else {
				setError(response.error || `${provider} login failed`);
			}
		} catch (err) {
			setError(`An error occurred during ${provider} login`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex overflow-hidden bg-background">
			{/* Left Side - Login Form */}
			<motion.div
				className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:px-12 lg:px-20"
				initial={{ opacity: 0, x: -40 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				<div className="w-full max-w-md">
					<motion.div
						className="mb-8"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						<h1 className="text-3xl font-bold text-foreground mb-2">
							Welcome Back
						</h1>
						<p className="text-muted-foreground">
							Sign in to your Stash TS account
						</p>
					</motion.div>

					{error && (
						<motion.div
							className="mb-6 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-sm text-destructive"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
						>
							{error}
						</motion.div>
					)}

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input
													placeholder="you@example.com"
													type="email"
													disabled={isLoading}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<div className="flex items-center justify-between">
												<FormLabel>Password</FormLabel>
												<Link
													href="/forgot-password"
													className="text-xs text-primary hover:underline"
												>
													Forgot?
												</Link>
											</div>
											<FormControl>
												<Input
													placeholder="••••••••"
													type="password"
													disabled={isLoading}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									disabled={isLoading}
									className="w-full"
									size="lg"
								>
									{isLoading ? "Signing in..." : "Sign In"}
								</Button>
							</form>
						</Form>
					</motion.div>

					<motion.div
						className="relative my-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}
					>
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border/50" />
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="px-2 bg-background text-muted-foreground">
								Or continue with
							</span>
						</div>
					</motion.div>

					<motion.div
						className="grid grid-cols-2 gap-3"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
					>
						<Button
							type="button"
							variant="outline"
							disabled={isLoading}
							onClick={() => handleOAuthSignIn("github")}
						>
							GitHub
						</Button>
						<Button
							type="button"
							variant="outline"
							disabled={isLoading}
							onClick={() => handleOAuthSignIn("google")}
						>
							Google
						</Button>
					</motion.div>

					<motion.div
						className="mt-6 text-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6, duration: 0.5 }}
					>
						<p className="text-sm text-muted-foreground">
							Don't have an account?{" "}
							<Link
								href="/signup"
								className="text-primary hover:underline font-medium"
							>
								Sign up
							</Link>
						</p>
					</motion.div>
				</div>
			</motion.div>

			{/* Right Side - Branding */}
			<motion.div
				className="hidden lg:flex w-1/2 bg-linear-to-br from-primary/10 via-primary/5 to-background items-center justify-center px-12"
				initial={{ opacity: 0, x: 40 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
			>
				<div className="max-w-md text-center">
					<motion.div
						className="mb-8"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							delay: 0.3,
							duration: 0.6,
							type: "spring",
							stiffness: 100,
						}}
					>
						<div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center">
							<span className="text-3xl font-bold text-primary-foreground">
								{"<>"}
							</span>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
					>
						<h2 className="text-3xl font-bold text-foreground mb-3">
							Stash TS
						</h2>
						<p className="text-muted-foreground mb-6">
							Your modern TypeScript snippet manager. Organize, search, and
							share your code snippets with ease.
						</p>
						<div className="space-y-3 pt-6 border-t border-border">
							<p className="text-sm font-medium text-foreground">
								✨ Built for developers
							</p>
							<p className="text-sm text-muted-foreground">
								Fast, intuitive, and designed with productivity in mind.
							</p>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
