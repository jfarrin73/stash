"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Add your login logic here
		setTimeout(() => setIsLoading(false), 1000);
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

					<motion.form
						onSubmit={handleSubmit}
						className="space-y-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						<div className="space-y-2">
							<Label htmlFor="email" className="text-sm font-medium">
								Email Address
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="h-10"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password" className="text-sm font-medium">
									Password
								</Label>
								<Link
									href="/forgot-password"
									className="text-xs text-primary hover:underline"
								>
									Forgot?
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="h-10"
							/>
						</div>

						<Button
							type="submit"
							disabled={isLoading}
							className="w-full h-10"
							size="lg"
						>
							{isLoading ? "Signing in..." : "Sign In"}
						</Button>
					</motion.form>

					<motion.div
						className="mt-6 text-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
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
				className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-background items-center justify-center px-12"
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
						<div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center">
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
