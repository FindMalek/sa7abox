"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	className?: string;
}

export function QuantitySelector({
	value,
	onChange,
	min = 1,
	max = 20,
	className,
}: QuantitySelectorProps) {
	const handleDecrement = () => {
		if (value > min) {
			onChange(value - 1);
		}
	};

	const handleIncrement = () => {
		if (value < max) {
			onChange(value + 1);
		}
	};

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Button
				type="button"
				variant="outline"
				size="icon"
				onClick={handleDecrement}
				disabled={value <= min}
				aria-label="Decrease quantity"
				className="h-8 w-8"
			>
				<MinusIcon className="h-4 w-4" />
			</Button>
			{/** biome-ignore lint/a11y/useAriaPropsSupportedByRole: <explanation> */}
<span
				className="w-8 text-center font-semibold"
				aria-label={`Quantity: ${value}`}
			>
				{value}
			</span>
			<Button
				type="button"
				variant="outline"
				size="icon"
				onClick={handleIncrement}
				disabled={value >= max}
				aria-label="Increase quantity"
				className="h-8 w-8"
			>
				<PlusIcon className="h-4 w-4" />
			</Button>
		</div>
	);
}
