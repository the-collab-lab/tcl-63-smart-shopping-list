const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

/**
 * Calculates the number of days between two JS Date objects.
 * @example
 * // Returns the number of days that have passed between the two dates.
 * const startDate = new Date("2023-09-15");
 * const endDate = new Date("2023-09-24");
 * getDaysBetweenDates(startDate, endDate); // Output is 9 (days)
 * @param {Date} startDate - The starting date.
 * @param {Date} endDate - The ending date.
 * @returns {number} - The number of days between the start and end dates.
 */
export function getDaysBetweenDates(startDate, endDate) {
	try {
		if (startDate instanceof Date && endDate instanceof Date) {
			const days_between_in_milliseconds =
				endDate.getTime() - startDate.getTime();

			// Using Math.round() to ensure that fractional days are rounded to the nearest whole day
			return Math.round(days_between_in_milliseconds / ONE_DAY_IN_MILLISECONDS);
		} else {
			console.log(
				`Not a date\nstartDate is of type: ${typeof startDate}\nendDate is of type: ${typeof endDate}`,
			);
		}
	} catch (error) {
		console.error('An error happened', error);
	}
}
