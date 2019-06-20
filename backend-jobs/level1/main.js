// please run `node level1/main.js`
const fs = require('fs');
const data = require('./data.json');

const getWorkersPrice = data => {
	const workers = [];
	data.shifts.forEach(shift => {
		const worker = data.workers.find(worker => worker.id === shift.user_id);
		if (!worker) {
			console.warn(`Worker not found for Shift(id=${shift.id}, user_id=${shift.user_id})`)
			return;
		}
		const { id, price_per_shift } = worker;
		const outputWorker = workers.find(_worker => _worker.id === worker.id);
		if (!outputWorker)
			workers.push({
				id,
				price: price_per_shift
			});
		else
			outputWorker.price += price_per_shift;
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
writeFile('level1/output.json', { workers });
