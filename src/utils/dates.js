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
			const daysBetweenInMilliseconds = endDate.getTime() - startDate.getTime();

			// Using Math.round() to ensure that fractional days are rounded to the nearest whole day
			return Math.abs(
				Math.round(daysBetweenInMilliseconds / ONE_DAY_IN_MILLISECONDS),
			);
		} else {
			console.log(
				`Not a date\nstartDate is of type: ${typeof startDate}\nendDate is of type: ${typeof endDate}`,
			);
		}
	} catch (error) {
		console.error('An error happened', error);
	}
}

export function purchaseSchedule(dateLastPurchased, dateNextPurchased) {
	const today = new Date();
	const dateNextPurchased_formatted = dateNextPurchased.toDate();
	let daysFromLastPurchase = 0; //in case when new item is added, by default daysFromLastPurchase == null, so assign a dummy value to proceed
	if (dateLastPurchased) {
		const dateLastPurchased_formatted = dateLastPurchased.toDate();
		daysFromLastPurchase = getDaysBetweenDates(
			dateLastPurchased_formatted,
			today,
		);
	}

	const daysTillNextPurchase = getDaysBetweenDates(
		today,
		dateNextPurchased_formatted,
	);
	let schedule = '';
	if (dateHasPassed(dateNextPurchased) && daysFromLastPurchase < 60) {
		schedule = 'overdue';
	} else if (daysFromLastPurchase >= 60) {
		schedule = 'inactive';
	} else if (daysTillNextPurchase <= 7) {
		schedule = 'soon';
	} else if (daysTillNextPurchase > 7 && daysTillNextPurchase < 30) {
		schedule = 'kind-of-soon';
	} else if (daysTillNextPurchase >= 30) {
		schedule = 'not-soon';
	}
	return schedule;
}
export function dateHasPassed(dateNextPurchased) {
	const today = new Date();
	const dateNextPurchased_formatted = dateNextPurchased.toDate();
	return dateNextPurchased_formatted.getTime() - today.getTime() < 0;
}
