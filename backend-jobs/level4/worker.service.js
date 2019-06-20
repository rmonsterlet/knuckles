const constants = require('./constants');
const shiftService = require('./shift.service');
const $$ = module.exports;

/**
 * Create price per worker array
 * 
 * @param {data} JSON input, contains workers and shifts
 * @return {[workers, commission]} [{id: number, price: number}[], {pdg_fee: number, interim_shifts: number}]
 */
$$.getWorkersPriceAndCommission = data => {
	const workers = [];
	const commission = {
		'pdg_fee': 0,
		'interim_shifts': 0
	}
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
		const [price, pgdFee] = shiftService.getShiftPriceAndPdgFee(status, shift.start_date);
		!outputWorker ? workers.push({id, price}) : outputWorker.price += price;
		commission.pdg_fee += pgdFee;
		if (status === constants.STATUS.INTERIM) commission.interim_shifts++;
	});
	workers.sort((w0, w1) => w0.id - w1.id)
	return [workers, commission];
};
