'use client'

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
			<motion.div
				className="flex flex-col items-center gap-8 max-w-4xl"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease: "easeOut" }}
			>
				<motion.h1
					className="text-6xl font-bold text-foreground text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
				>
					Stash TS
				</motion.h1>
				<motion.p
					className="text-lg text-muted-foreground text-center"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
				>
					Stash TS is your modern TypeScript snippet manager. Organize, search,
					and share your code snippets with ease—built for developers who value
					productivity and clarity.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
				>
					<Button asChild size="lg">
						<Link href="/docs">View Docs</Link>
					</Button>
				</motion.div>
			</motion.div>
		</div>
	);
}
