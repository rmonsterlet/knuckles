const $$ = module.exports;

const STATUS = {
	MEDIC: 'medic',
	INTERNE: 'interne',
	INTERIM: 'interim',
}
$$.STATUS = STATUS;

$$.STATUS_PRICES = {
	[STATUS.MEDIC]: 270,
	[STATUS.INTERNE]: 126,
	[STATUS.INTERIM]: 480,
};

$$.PDG_FEE_PER_SHIFT_RATE = 5/100;

$$.PDG_FEE_PER_INTERIM_SHIFT = 80;