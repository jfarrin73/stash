import type { ReactNode } from "react";

interface ShowProps<T> {
	when: T | undefined | null | boolean;
	fallback?: ReactNode;
	children: ReactNode | (() => ReactNode);
}

export function Show<T>({ when, fallback = null, children }: ShowProps<T>) {
	if (!when) {
		return <>{fallback}</>;
	}

	if (typeof children === "function") {
		return <>{children()}</>;
	}

	return <>{children}</>;
}
