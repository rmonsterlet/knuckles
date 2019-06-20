const fs = require('fs');
const $$ = module.exports;

$$.readFile = path => require(path);

$$.writeFile = (path, data) => {
	const _data = JSON.stringify(data, null, 4);
	fs.writeFile(path, _data, err => {
		if (err) throw err;
		console.debug(_data);
	});
};
