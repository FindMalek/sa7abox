import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTnd(amount: number): string {
  return `${amount.toFixed(2)} TND`;
}

export function formatCurrency(amount: number, currency: string = "TND"): string {
  return `${amount.toFixed(2)} ${currency}`;
}