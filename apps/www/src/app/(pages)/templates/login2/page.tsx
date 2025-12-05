"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: LoginFormValues) => {
		setIsLoading(true);
		try {
			const response = await signInWithEmail(values);
			if (response.success) {
				toast.success("Login successful!", {
					description: `Welcome back, ${response.data?.user.name}!`,
				});
				// TODO: Handle successful login (redirect, store token, etc.)
				console.log("Login successful:", response.data);
			} else {
				toast.error("Login failed", {
					description: response.error || "An unexpected error occurred",
				});
			}
		} catch (err) {
			console.error(err);
			toast.error("Login error", {
				description: "An error occurred during login. Please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleOAuthSignIn = async (provider: "github" | "google") => {
		setIsLoading(true);
		try {
			const response = await signInWithOAuth(provider);
			if (response.success) {
				toast.success(`${provider} login successful!`, {
					description: `Welcome back, ${response.data?.user.name}!`,
				});
				// TODO: Handle successful OAuth login
				console.log(`${provider} login successful:`, response.data);
			} else {
				toast.error(`${provider} login failed`, {
					description: response.error || "An unexpected error occurred",
				});
			}
		} catch (err) {
			console.error(err);
			toast.error("OAuth error", {
				description: `An error occurred during ${provider} login`,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-primary/5 px-4 py-12">
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
					animate={{ y: [0, 30, 0] }}
					transition={{ duration: 6, repeat: Infinity }}
				/>
				<motion.div
					className="absolute bottom-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
					animate={{ y: [0, -30, 0] }}
					transition={{ duration: 8, repeat: Infinity }}
				/>
			</div>

			{/* Content Container */}
			<motion.div
				className="w-full max-w-md relative z-10"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
			>
				{/* Header Section */}
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<motion.div
						className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary/60 mb-6"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							delay: 0.1,
							duration: 0.5,
							type: "spring",
							stiffness: 120,
						}}
					>
						<span className="text-2xl font-bold text-primary-foreground">
							{"<>"}
						</span>
					</motion.div>
					<h1 className="text-3xl font-bold text-foreground mb-2">Stash TS</h1>
					<p className="text-muted-foreground">Sign in to your account</p>
				</motion.div>

				{/* Login Card */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.5 }}
				>
					<Card className="p-8 border border-border/50 shadow-lg backdrop-blur-sm">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* Email Field */}
								<motion.div
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.4, duration: 0.4 }}
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
														className="bg-background/50 border-border/50 focus-visible:border-primary/50"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</motion.div>

								{/* Password Field */}
								<motion.div
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.5, duration: 0.4 }}
								>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<div className="flex items-center justify-between">
													<FormLabel>Password</FormLabel>
													<Link
														href="/forgot-password"
														className="text-xs text-primary hover:underline transition-colors"
													>
														Forgot password?
													</Link>
												</div>
												<FormControl>
													<Input
														placeholder="••••••••"
														type="password"
														disabled={isLoading}
														className="bg-background/50 border-border/50 focus-visible:border-primary/50"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</motion.div>

								{/* Submit Button */}
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6, duration: 0.4 }}
								>
									<Button
										type="submit"
										disabled={isLoading}
										className="w-full mt-2"
										size="lg"
									>
										{isLoading ? "Signing in..." : "Sign In"}
									</Button>
								</motion.div>
							</form>
						</Form>

						{/* Divider */}
						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-border/50" />
							</div>
							<div className="relative flex justify-center text-xs">
								<span className="px-2 bg-card text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>

						{/* Social Buttons */}
						<motion.div
							className="grid grid-cols-2 gap-3"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7, duration: 0.4 }}
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
					</Card>
				</motion.div>

				{/* Sign Up Link */}
				<motion.div
					className="mt-8 text-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.4 }}
				>
					<p className="text-sm text-muted-foreground">
						{`Don't have an account? `}
						<Link
							href="/signup"
							className="text-primary hover:underline font-medium transition-colors"
						>
							Create one
						</Link>
					</p>
				</motion.div>

				{/* Footer Text */}
				<motion.div
					className="mt-6 text-center text-xs text-muted-foreground space-y-2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.9, duration: 0.4 }}
				>
					<p>
						By signing in, you agree to our{" "}
						<Link href="/terms" className="hover:underline">
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link href="/privacy" className="hover:underline">
							Privacy Policy
						</Link>
					</p>
				</motion.div>
			</motion.div>
		</div>
	);
}
