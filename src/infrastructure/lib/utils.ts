import { DonationData } from "../../domain/interfaces/DonationData";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatValue = (value: number, type: number) => {
  switch (type) {
    case 1: // Currency
      return `$${value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`;
    case 2: // Plain number
      return value.toLocaleString("en-US");
    case 3: // Percentage
      return `${value}%`;
    default:
      return value; // Fallback for unexpected types
  }
};

export function calculateTotalDonations(donations: DonationData[]) {
  return donations
    .reduce((total, donation) => total + donation.amount, 0)
    .toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
}

/**
 * Calculates the percentage change between two amounts.
 * @param previous - The previous month's amount
 * @param current - The current month's amount
 * @returns Percentage change as a string with a "+" or "-" sign
 */
export function calculatePercentageChange(
  previous: number,
  current: number
): string {
  if (previous === 0) return "+100%"; // Handle division by zero
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "+" : "-"}${change.toFixed(1)}%`;
}
