"use client";

import { useEffect, useState } from "react";
import { isOrderingClosedToday } from "@/lib/order-availability";

export function useOrderingClosed(): boolean {
	const [closed, setClosed] = useState(false);

	useEffect(() => {
		setClosed(isOrderingClosedToday());
	}, []);

	return closed;
}
