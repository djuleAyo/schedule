export const seconds = 1000;
export const minutes = seconds * 60;
export const hours = minutes * 60;
export const days = hours * 24;

/**
 * Returns number of ms from day start
 */
export function inTheDay(date: Date): number {
    let dayStart = new Date(date.setHours(0, 0, 0, 0));

    return date.getTime() - dayStart.getTime();
}
