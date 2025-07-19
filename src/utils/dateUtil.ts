/**
 * Returns the current date and time formatted as a string suitable for filenames.
 *
 * The format is: `DD-Month-YYYY-HH_MMAM/PM` (e.g., `05-July-2024-09_15AM`).
 * - Day is zero-padded to two digits.
 * - Month is the full month name (e.g., "July").
 * - Year is four digits.
 * - Time is in 12-hour format with hours and minutes, separated by an underscore, and suffixed with AM/PM.
 *
 * @returns {string} The formatted timestamp string.
 *
 * @lastModified 19-07-2025
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
            hour12: true
        })
        .replace(':', '_'); // replace : with _ to be file-safe

    return `${day}-${month}-${year}-${time.replace(' ', '')}`;
}
