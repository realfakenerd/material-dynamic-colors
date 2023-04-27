import CAM16 from './CAM16';
import DEFAULT from './Default';
import { intFromXyzComponents } from './utils/convertions';
import { signum } from './utils/math';

function viewed(self: CAM16) {
	const t = Math.pow(
		(0 === self.chroma || 0 === self.j ? 0 : self.chroma / Math.sqrt(self.j / 100)) /
			Math.pow(1.64 - Math.pow(0.29, DEFAULT.n), 0.73),
		1 / 0.9
	);
	const hRad = (self.hue * Math.PI) / 180;
	const p2 = (DEFAULT.aw * Math.pow(self.j / 100, 1 / DEFAULT.c / DEFAULT.z)) / DEFAULT.nbb;
	const hSin = Math.sin(hRad);
	const hCos = Math.cos(hRad);
	const gamma =
		(23 * (p2 + 0.305) * t) /
		((5e4 / 13) * (Math.cos(hRad + 2) + 3.8) * 5.75 * DEFAULT.nc * DEFAULT.ncb +
			11 * t * hCos +
			108 * t * hSin);
	const a = gamma * hCos;
	const b = gamma * hSin;
	const rA = (460 * p2 + 451 * a + 288 * b) / 1403;
	const gA = (460 * p2 - 891 * a - 261 * b) / 1403;
	const bA = (460 * p2 - 220 * a - 6300 * b) / 1403;
	const rF =
			((100 / DEFAULT.fl) *
				signum(rA) *
				Math.pow(Math.max(0, (27.13 * Math.abs(rA)) / (400 - Math.abs(rA))), 1 / 0.42)) /
			DEFAULT.rgbD[0],
		gF =
			((100 / DEFAULT.fl) *
				signum(gA) *
				Math.pow(Math.max(0, (27.13 * Math.abs(gA)) / (400 - Math.abs(gA))), 1 / 0.42)) /
			DEFAULT.rgbD[1],
		bF =
			((100 / DEFAULT.fl) *
				signum(bA) *
				Math.pow(Math.max(0, (27.13 * Math.abs(bA)) / (400 - Math.abs(bA))), 1 / 0.42)) /
			DEFAULT.rgbD[2];
	return intFromXyzComponents(
		1.86206786 * rF - 1.01125463 * gF + 0.14918677 * bF,
		0.38752654 * rF + 0.62144744 * gF - 0.00897398 * bF,
		-0.0158415 * rF - 0.03412294 * gF + 1.04996444 * bF
	);
}

export default viewed;
