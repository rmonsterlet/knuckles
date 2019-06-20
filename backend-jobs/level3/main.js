// please run `node level2/main.js`
const workerService = require('./worker.service');
const ioService = require ('./io.service')

const data = ioService.readFile('./data.json');
const workers = workerService.getWorkersPrice(data);
ioService.writeFile('level3/output.json', { workers });
