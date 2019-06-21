const constants = require('./constants');
const $$ = module.exports;

 /**
 * Get price and commission of a given shift, depending on worker's shift status and shift's startDate. 
 * Shifts happening on a saturday or a sunday are paid twice
 * 
 * @param {status} worker's shift status
 * @return {startDate} shift's start date
 * @return {[price, commission]} [number, number]
 */
$$.getShiftPriceAndPdgFee = (status, startDate) => {
	let date = new Date(startDate);
	if (isNaN(date.getDay())) throw new Error(`Invalid shift's start date ${startDate}`);
	const isDouble = date.getDay() === 0 || date.getDay() === 6;
	const price = isDouble ? constants.STATUS_PRICES[status] * 2 : constants.STATUS_PRICES[status];
	const pdgFee = (status === constants.STATUS.INTERIM) ?
		price * constants.PDG_FEE_PER_SHIFT_RATE + constants.PDG_FEE_PER_INTERIM_SHIFT :
		price * constants.PDG_FEE_PER_SHIFT_RATE;
	return [price, pdgFee];
}
