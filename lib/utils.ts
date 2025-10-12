
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount?: number) => {
  if (amount === undefined || amount === null) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string | null | undefined, options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' }) => {
    if (!dateString) return 'Present';
    try {
        const date = new Date(dateString);
        // Add time zone to prevent off-by-one day errors
        const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        return new Intl.DateTimeFormat('en-US', options).format(utcDate);
    } catch (e) {
        return 'Invalid Date';
    }
};

export const dateToYYYYMMDD = (date: Date | null | undefined) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
};
