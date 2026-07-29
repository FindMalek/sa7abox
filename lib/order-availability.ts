const STORE_TIMEZONE = "Africa/Tunis";
const CLOSED_WEEKDAY = "Sunday";

export function isOrderingClosedToday(): boolean {
	const weekday = new Intl.DateTimeFormat("en-US", {
		timeZone: STORE_TIMEZONE,
		weekday: "long",
	}).format(new Date());

	return weekday === CLOSED_WEEKDAY;
}
