import { format, isValid } from 'date-fns';

/**
 * Safely formats a date string. Returns a fallback if the date is missing or invalid.
 * @param dateStr The date string to format
 * @param formatStr The date-fns format string
 * @param fallback The fallback string to return if formatting fails
 */
export const safeFormat = (dateStr: string | null | undefined, formatStr: string, fallback: string = 'TBD'): string => {
    if (!dateStr) return fallback;
    const date = new Date(dateStr);
    if (!isValid(date)) return fallback;
    return format(date, formatStr);
};
