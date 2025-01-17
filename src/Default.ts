import ViewingConditions from './ViewingConditions';
import WHITE_POINT_D65 from './utils/WHITE_POINT_D65';

function DEFAULT(
	whitePoint = WHITE_POINT_D65,
	adaptingLuminance = ((200 / Math.PI) * 100 * Math.pow(66 / 116, 3)) / 100,
	backgroundLstar = 50,
	surround = 2,
	discountingIlluminant = !1
) {
	const rW = 0.401288 * whitePoint[0] + 0.650173 * whitePoint[1] + -0.051461 * whitePoint[2];
	const gW = -0.250268 * whitePoint[0] + 1.204414 * whitePoint[1] + 0.045854 * whitePoint[2];
	const bW = -0.002079 * whitePoint[0] + 0.048952 * whitePoint[1] + 0.953127 * whitePoint[2];
	const f = 0.8 + surround / 10;

	let _temp: number;
	if (0.9 <= f) {
		const amount = 10 * (f - 0.9);
		_temp = 0.59 * (1 - amount) + 0.69 * amount;
	} else {
		const amount_ = 10 * (f - 0.8);
		_temp = 0.525 * (1 - amount_) + 0.59 * amount_;
	}
	let d = discountingIlluminant ? 1 : f * (1 - (1 / 3.6) * Math.exp((-adaptingLuminance - 42) / 92));
	d = 1 < d ? 1 : 0 > d ? 0 : d;
	const rgbD = [(100 / rW) * d + 1 - d, (100 / gW) * d + 1 - d, (100 / bW) * d + 1 - d],
		k = 1 / (5 * adaptingLuminance + 1),
		k4 = k * k * k * k,
		k4F = 1 - k4,
		fl = k4 * adaptingLuminance + 0.1 * k4F * k4F * Math.cbrt(5 * adaptingLuminance),
		n =
			(8 < backgroundLstar
				? 100 * Math.pow((backgroundLstar + 16) / 116, 3)
				: (backgroundLstar / (24389 / 27)) * 100) / whitePoint[1],
		nbb = 0.725 / Math.pow(n, 0.2),
		rgbAFactors = [
			Math.pow((fl * rgbD[0] * rW) / 100, 0.42),
			Math.pow((fl * rgbD[1] * gW) / 100, 0.42),
			Math.pow((fl * rgbD[2] * bW) / 100, 0.42)
		],
		rgbA = [
			(400 * rgbAFactors[0]) / (rgbAFactors[0] + 27.13),
			(400 * rgbAFactors[1]) / (rgbAFactors[1] + 27.13),
			(400 * rgbAFactors[2]) / (rgbAFactors[2] + 27.13)
		];
	return new ViewingConditions(
		n,
		(2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]) * nbb,
		nbb,
		nbb,
		_temp,
		f,
		rgbD,
		fl,
		Math.pow(fl, 0.25),
		1.48 + Math.sqrt(n)
	);
}

export default DEFAULT();
