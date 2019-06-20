const constants = require('./constants');
const shiftService = require('./shift.service');
const $$ = module.exports;

/**
 * Create price per worker array
 * 
 * @param {data} JSON input, contains workers and shifts
 * @return {workers} {id: number, price: number}[]
 */
$$.getWorkersPrice = data => {
	const workers = [];
	data.shifts.forEach(shift => {
		const worker = data.workers.find(worker => worker.id === shift.user_id);
		if (!worker) {
			console.warn(`Worker not found for Shift(id=${shift.id}, user_id=${shift.user_id})`)
			return;
		}
		const { id, status } = worker;
		if (!constants.STATUS_PRICES[status]) {
			console.warn(`Status ${status} unknown for Worker(id=${id})`);
			return;
		}
		const outputWorker = workers.find(_worker => _worker.id === worker.id);
		if (!outputWorker)
			workers.push({
				id,
				price: shiftService.getShiftPrice(status, shift.start_date),
			});
		else
			outputWorker.price += shiftService.getShiftPrice(status, shift.start_date);
	});
	return workers.sort((w0, w1) => w0.id - w1.id);
};
