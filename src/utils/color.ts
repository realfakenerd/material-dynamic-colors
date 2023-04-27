import { hexFromInt } from './convertions';

function numberToHex(value: number) {
	try {
		return hexFromInt(value);
	} catch (error) {
		return console.debug(`error converting [${value}] to hex`, error), '#000000';
	}
}

export { numberToHex };
