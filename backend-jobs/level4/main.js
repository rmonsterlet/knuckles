// please run `node level4/main.js`
const workerService = require('./worker.service');
const ioService = require ('./io.service')

const data = ioService.readFile('./data.json');
const [workers, commission] = workerService.getWorkersPriceAndCommission(data);
ioService.writeFile('level4/output.json', { workers, commission });
