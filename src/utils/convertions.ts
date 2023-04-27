import { clamp, delinearized, linearized, signum } from './math';
import WHITE_POINT_D65 from './WHITE_POINT_D65';
import DEFAULT from '../Default';
import CAM16 from '../CAM16';
import ThemeAdapter from '../ThemeAdapter';
import CorePalette from '../CorePalette';
import { flags } from '../Flag';
import { HCT } from '../htc';

/**
 * Converts from hexadecimal to number
 */
function hexFromInt(argb: number) {
	const g = (argb & 65280) >> 8,
		b = argb & 255,
		outParts = [((argb & 16711680) >> 16).toString(16), g.toString(16), b.toString(16)];
	for (const [i_tsickle_destructured_1, part_tsickle_destructured_2] of outParts.entries()) {
		const i = i_tsickle_destructured_1,
			part = part_tsickle_destructured_2;
		1 === part.length && (outParts[i] = '0' + part);
	}
	return '#' + outParts.join('');
}

function fromInt(argb) {
    const cam = fromIntInViewingConditions(argb);
    return new HCT(cam.hue, cam.chroma, lstarFromInt(argb))
  };

function intFromHex(hex: string) {
	hex = hex.replace('#', '');
	const isThree = 3 === hex.length;
	const isSix = 6 === hex.length;
	const isEight = 8 === hex.length;
	if (!isThree && !isSix && !isEight) throw Error('unexpected hex ' + hex);
	let r = 0;
	let g = 0;
	let b = 0;
	isThree
		? ((r = parseInt(hex.slice(0, 1).repeat(2), 16)),
		  (g = parseInt(hex.slice(1, 2).repeat(2), 16)),
		  (b = parseInt(hex.slice(2, 3).repeat(2), 16)))
		: isSix
		? ((r = parseInt(hex.slice(0, 2), 16)),
		  (g = parseInt(hex.slice(2, 4), 16)),
		  (b = parseInt(hex.slice(4, 6), 16)))
		: isEight &&
		  ((r = parseInt(hex.slice(2, 4), 16)),
		  (g = parseInt(hex.slice(4, 6), 16)),
		  (b = parseInt(hex.slice(6, 8), 16)));
	return (-16777216 | ((r & 255) << 16) | ((g & 255) << 8) | (b & 255)) >>> 0;
}

function intFromRgb(rgb: number[]) {
	return (-16777216 | ((rgb[0] & 255) << 16) | ((rgb[1] & 255) << 8) | (rgb[2] & 255)) >>> 0;
}

function intFromXyzComponents(x: number, y: number, z: number) {
	x /= 100;
	y /= 100;
	z /= 100;
	return intFromRgb([
		Math.round(clamp(255, 255 * delinearized(3.2406 * x + -1.5372 * y + -0.4986 * z))),
		Math.round(clamp(255, 255 * delinearized(-0.9689 * x + 1.8758 * y + 0.0415 * z))),
		Math.round(clamp(255, 255 * delinearized(0.0557 * x + -0.204 * y + 1.057 * z)))
	]);
}

function intFromLstar(lstar: number) {
	const fy = (lstar + 16) / 116;
	const kappa = 24389 / 27;
	const cubeExceedEpsilon = fy * fy * fy > 216 / 24389;
	const xyz = [
		(cubeExceedEpsilon ? fy * fy * fy : (116 * fy - 16) / kappa) * WHITE_POINT_D65[0],
		(8 < lstar ? fy * fy * fy : lstar / kappa) * WHITE_POINT_D65[1],
		(cubeExceedEpsilon ? fy * fy * fy : (116 * fy - 16) / kappa) * WHITE_POINT_D65[2]
	];
	return intFromXyzComponents(xyz[0], xyz[1], xyz[2]);
}

function labFromInt(argb: number) {
	const e = 216 / 24389;
	const kappa = 24389 / 27;
	const redL = 100 * linearized(((argb & 16711680) >> 16) / 255);
	const greenL = 100 * linearized(((argb & 65280) >> 8) / 255);
	const blueL = 100 * linearized((argb & 255) / 255);
	const yNormalized = (0.2126 * redL + 0.7152 * greenL + 0.0722 * blueL) / WHITE_POINT_D65[1];
	const fy = yNormalized > e ? Math.pow(yNormalized, 1 / 3) : (kappa * yNormalized + 16) / 116;
	const xNormalized =
		(0.41233895 * redL + 0.35762064 * greenL + 0.18051042 * blueL) / WHITE_POINT_D65[0];
	const zNormalized =
		(0.01932141 * redL + 0.11916382 * greenL + 0.95034478 * blueL) / WHITE_POINT_D65[2];
	return [
		116 * fy - 16,
		500 * ((xNormalized > e ? Math.pow(xNormalized, 1 / 3) : (kappa * xNormalized + 16) / 116) - fy),
		200 * (fy - (zNormalized > e ? Math.pow(zNormalized, 1 / 3) : (kappa * zNormalized + 16) / 116))
	];
}

function lstarFromInt(argb: number) {
	let y =
		21.26 * linearized(((argb & 16711680) >> 16) / 255) +
		71.52 * linearized(((argb & 65280) >> 8) / 255) +
		7.22 * linearized((argb & 255) / 255);
	y /= 100;
	return y <= 216 / 24389 ? (24389 / 27) * y : 116 * Math.pow(y, 1 / 3) - 16;
}

function fromIntInViewingConditions(argb: number) {
	const redL = 100 * linearized(((argb & 16711680) >> 16) / 255),
		greenL = 100 * linearized(((argb & 65280) >> 8) / 255),
		blueL = 100 * linearized((argb & 255) / 255),
		x = 0.41233895 * redL + 0.35762064 * greenL + 0.18051042 * blueL,
		y = 0.2126 * redL + 0.7152 * greenL + 0.0722 * blueL,
		z = 0.01932141 * redL + 0.11916382 * greenL + 0.95034478 * blueL,
		rD = DEFAULT.rgbD[0] * (0.401288 * x + 0.650173 * y - 0.051461 * z),
		gD = DEFAULT.rgbD[1] * (-0.250268 * x + 1.204414 * y + 0.045854 * z),
		bD = DEFAULT.rgbD[2] * (-0.002079 * x + 0.048952 * y + 0.953127 * z),
		rAF = Math.pow((DEFAULT.fl * Math.abs(rD)) / 100, 0.42),
		gAF = Math.pow((DEFAULT.fl * Math.abs(gD)) / 100, 0.42),
		bAF = Math.pow((DEFAULT.fl * Math.abs(bD)) / 100, 0.42),
		rA = (400 * signum(rD) * rAF) / (rAF + 27.13),
		gA = (400 * signum(gD) * gAF) / (gAF + 27.13),
		bA = (400 * signum(bD) * bAF) / (bAF + 27.13),
		a = (11 * rA + -12 * gA + bA) / 11,
		b = (rA + gA - 2 * bA) / 9,
		atanDegrees = (180 * Math.atan2(b, a)) / Math.PI,
		hue = 0 > atanDegrees ? atanDegrees + 360 : 360 <= atanDegrees ? atanDegrees - 360 : atanDegrees,
		hueRadians = (hue * Math.PI) / 180,
		j =
			100 *
			Math.pow((((40 * rA + 20 * gA + bA) / 20) * DEFAULT.nbb) / DEFAULT.aw, DEFAULT.c * DEFAULT.z),
		alpha =
			Math.pow(
				((5e4 / 13) *
					0.25 *
					(Math.cos(((20.14 > hue ? hue + 360 : hue) * Math.PI) / 180 + 2) + 3.8) *
					DEFAULT.nc *
					DEFAULT.ncb *
					Math.sqrt(a * a + b * b)) /
					((20 * rA + 20 * gA + 21 * bA) / 20 + 0.305),
				0.9
			) * Math.pow(1.64 - Math.pow(0.29, DEFAULT.n), 0.73),
		c = alpha * Math.sqrt(j / 100),
		mstar = (1 / 0.0228) * Math.log(1 + 0.0228 * c * DEFAULT.fLRoot);
	return new CAM16(
		hue,
		c,
		j,
		(4 / DEFAULT.c) * Math.sqrt(j / 100) * (DEFAULT.aw + 4) * DEFAULT.fLRoot,
		50 * Math.sqrt((alpha * DEFAULT.c) / (DEFAULT.aw + 4)),
		((1 + 100 * 0.007) * j) / (1 + 0.007 * j),
		mstar * Math.cos(hueRadians),
		mstar * Math.sin(hueRadians)
	);
}

function fromColor(value: string) {
	const is3p = flags.is3p;
	console.debug('theme adapter from color');
	const keyTones = new CorePalette(intFromHex(value));
	return new ThemeAdapter({
		tones: keyTones,
		seed: value,
		is3p,
		overrides: {},
		blend: !1,
		isBaseline: !1
	});
}

export {
	fromInt,
	fromColor,
	hexFromInt,
	intFromHex,
	intFromRgb,
	intFromXyzComponents,
	intFromLstar,
	labFromInt,
	lstarFromInt,
	fromIntInViewingConditions
};
