// please run `node level2/main.js`
const fs = require('fs');
const data = require('./data.json');

const STATUS_PRICES = {
	'medic': 270,
	'interne': 126,
};

const getWorkersPrice = data => {
	const workers = [];
	data.shifts.forEach(shift => {
		const worker = data.workers.find(worker => worker.id === shift.user_id);
		if (!worker) {
			console.warn(`Worker not found for Shift(id=${shift.id}, user_id=${shift.user_id})`)
			return;
		}
		const { id, status } = worker;
		if (!STATUS_PRICES[status]) {
			console.warn(`Status ${status} unknown for Worker(id=${id})`);
			return;
		}
		const outputWorker = workers.find(_worker => _worker.id === worker.id);
		if (!outputWorker)
			workers.push({
				id,
				price: STATUS_PRICES[status]
			});
		else
			outputWorker.price += STATUS_PRICES[status];
	});
	return workers.sort((w0, w1) => w0.id - w1.id);
};
const writeFile = (path, data) => {
	const _data = JSON.stringify(data, null, 4);
	fs.writeFile(path, _data, err => {
		if (err) throw err;
		console.debug(_data);
	});
};

const workers = getWorkersPrice(data);
writeFile('level2/output.json', { workers });
