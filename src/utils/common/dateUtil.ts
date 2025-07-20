/**
 * Returns the current date and time as a formatted string.
 *
 * Format: DD-Month-YYYY-HH_MM (e.g., "20-July-2025-14_30")
 * - Day is zero-padded to 2 digits.
 * - Month is the full month name (e.g., "July").
 * - Year is 4 digits.
 * - Time is in 24-hour format, with hours and minutes separated by an underscore.
 *
 * @returns {string} The formatted timestamp string.
 */
export function getFormattedTimestamp(): string {
    const now = new Date();

    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'long' }); // e.g., July
    const year = now.getFullYear();
    const time = now
        .toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        .replace(':', '_'); // replace : with _ to be file-safe

    return `${day}-${month}-${year}-${time.replace(' ', '')}`;
}
