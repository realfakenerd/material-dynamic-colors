import type CAM16 from '../CAM16';
import { MaximizeResult, type QuantizerWu, type Box } from '../quantizer_wu';
import { fromIntInViewingConditions, lstarFromInt } from './convertions';
import getIndex from './getIndex';

function clamp(max: number, input: number) {
	return Math.min(Math.max(input, 0), max);
}

function sanitizeDegrees(degrees: number) {
	return 0 > degrees ? (degrees % 360) + 360 : 360 <= degrees ? degrees % 360 : degrees;
}

function delinearized(rgb: number) {
	return 0.0031308 >= rgb ? 12.92 * rgb : 1.055 * Math.pow(rgb, 1 / 2.4) - 0.055;
}

function linearized(rgb: number) {
	return 0.04045 >= rgb ? rgb / 12.92 : Math.pow((rgb + 0.055) / 1.055, 2.4);
}

function signum(input: number) {
	return 0 > input ? -1 : 0 === input ? 0 : 1;
}

function variance(self: QuantizerWu, cube: Box) {
	const dr = self.volume(cube, self.momentsR),
		dg = self.volume(cube, self.momentsG),
		db = self.volume(cube, self.momentsB),
		xx =
			self.moments[getIndex(cube.r1, cube.g1, cube.b1)] -
			self.moments[getIndex(cube.r1, cube.g1, cube.b0)] -
			self.moments[getIndex(cube.r1, cube.g0, cube.b1)] +
			self.moments[getIndex(cube.r1, cube.g0, cube.b0)] -
			self.moments[getIndex(cube.r0, cube.g1, cube.b1)] +
			self.moments[getIndex(cube.r0, cube.g1, cube.b0)] +
			self.moments[getIndex(cube.r0, cube.g0, cube.b1)] -
			self.moments[getIndex(cube.r0, cube.g0, cube.b0)],
		hypotenuse = dr * dr + dg * dg + db * db,
		volume = self.volume(cube, self.weights);
	return xx - hypotenuse / volume;
}

function cut(self: QuantizerWu, one: Box, two: Box) {
	const wholeR = self.volume(one, self.momentsR),
		wholeG = self.volume(one, self.momentsG),
		wholeB = self.volume(one, self.momentsB),
		wholeW = self.volume(one, self.weights),
		maxRResult = maximize(self, one, 'red', one.r0 + 1, one.r1, wholeR, wholeG, wholeB, wholeW),
		maxGResult = maximize(self, one, 'green', one.g0 + 1, one.g1, wholeR, wholeG, wholeB, wholeW),
		maxBResult = maximize(self, one, 'blue', one.b0 + 1, one.b1, wholeR, wholeG, wholeB, wholeW);
	let direction;
	const maxR = maxRResult.maximum,
		maxG = maxGResult.maximum,
		maxB = maxBResult.maximum;
	if (maxR >= maxG && maxR >= maxB) {
		if (0 > maxRResult.cutLocation) return !1;
		direction = 'red';
	} else direction = maxG >= maxR && maxG >= maxB ? 'green' : 'blue';
	two.r1 = one.r1;
	two.g1 = one.g1;
	two.b1 = one.b1;
	switch (direction) {
		case 'red':
			one.r1 = maxRResult.cutLocation;
			two.r0 = one.r1;
			two.g0 = one.g0;
			two.b0 = one.b0;
			break;
		case 'green':
			one.g1 = maxGResult.cutLocation;
			two.r0 = one.r0;
			two.g0 = one.g1;
			two.b0 = one.b0;
			break;
		case 'blue':
			one.b1 = maxBResult.cutLocation;
			two.r0 = one.r0;
			two.g0 = one.g0;
			two.b0 = one.b1;
			break;
		default:
			throw Error('unexpected direction ' + direction);
	}
	one.vol = (one.r1 - one.r0) * (one.g1 - one.g0) * (one.b1 - one.b0);
	two.vol = (two.r1 - two.r0) * (two.g1 - two.g0) * (two.b1 - two.b0);
	return !0;
}

function score(colorsToPopulation: Map<number, number>) {
	let populationSum = 0;

	for (const population of colorsToPopulation.values()) populationSum += population;

	const colorsToProportion = new Map<number, number>();
	const colorsToCam = new Map<number, CAM16>();
	const hueProportions = Array<number>(360).fill(0);

	for (const [
		color_tsickle_destructured_1,
		population_tsickle_destructured_2
	] of colorsToPopulation.entries()) {
		const color = color_tsickle_destructured_1;
		const proportion = population_tsickle_destructured_2 / populationSum;
		const cam = fromIntInViewingConditions(color);

		colorsToProportion.set(color, proportion);

		colorsToCam.set(color, cam);
		hueProportions[Math.round(cam.hue)] += proportion;
	}
	const colorsToExcitedProportion = new Map<number, number>();
	for (const [color_tsickle_destructured_3, cam_tsickle_destructured_4] of colorsToCam.entries()) {
		const color = color_tsickle_destructured_3;
		const hue = Math.round(cam_tsickle_destructured_4.hue);
		let excitedProportion = 0;
		for (let i = hue - 15; i < hue + 15; i++) excitedProportion += hueProportions[sanitizeDegrees(i)];

		colorsToExcitedProportion.set(color, excitedProportion);
	}

	const colorsToScore = new Map<number, number>();

	for (const [color_tsickle_destructured_5, cam_tsickle_destructured_6] of colorsToCam.entries()) {
		const color = color_tsickle_destructured_5;
		const cam = cam_tsickle_destructured_6;
		const proportionScore = 70 * colorsToExcitedProportion.get(color)!;

		colorsToScore.set(color, proportionScore + (cam.chroma - 48) * (48 > cam.chroma ? 0.1 : 0.3));
	}
	const filteredColors = filter(colorsToExcitedProportion, colorsToCam);
	const dedupedColorsToScore = new Map<number, number>();
	for (const color of filteredColors) {
		let duplicateHue = !1;
		const hue = colorsToCam.get(color)!.hue;
		for (const [alreadyChosenColor_tsickle_destructured_7] of dedupedColorsToScore) {
			const alreadyChosenHue = colorsToCam.get(alreadyChosenColor_tsickle_destructured_7)!.hue;
			if (15 > 180 - Math.abs(Math.abs(hue - alreadyChosenHue) - 180)) {
				duplicateHue = !0;
				break;
			}
		}
		duplicateHue || dedupedColorsToScore.set(color, colorsToScore.get(color)!);
	}
	const colorsByScoreDescending = Array.from(dedupedColorsToScore.entries());
	colorsByScoreDescending.sort((first, second) => second[1] - first[1]);
	const answer = colorsByScoreDescending.map((entry) => entry[0]);
	0 === answer.length && answer.push(4282549748);
	return answer;
}

function filter(colorsToExcitedProportion: Map<number, number>, colorsToCam: Map<number, CAM16>) {
	const filtered = [];
	for (const [color_tsickle_destructured_8, cam_tsickle_destructured_9] of colorsToCam.entries()) {
		const color = color_tsickle_destructured_8;
		const cam = cam_tsickle_destructured_9;
		const proportion = colorsToExcitedProportion.get(color);
		15 <= cam.chroma && 10 <= lstarFromInt(color) && 0.01 <= proportion! && filtered.push(color);
	}
	return filtered;
}

function maximize(
	self: QuantizerWu,
	cube: Box,
	direction: 'red' | 'green' | 'blue',
	first: number,
	last: number,
	wholeR: number,
	wholeG: number,
	wholeB: number,
	wholeW: number
) {
	const bottomR = self.bottom(cube, direction, self.momentsR),
		bottomG = self.bottom(cube, direction, self.momentsG),
		bottomB = self.bottom(cube, direction, self.momentsB),
		bottomW = self.bottom(cube, direction, self.weights);
	let max = 0,
		cut = -1,
		halfR,
		halfG,
		halfB,
		halfW;
	for (let i = first; i < last; i++) {
		halfR = bottomR + self.top(cube, direction, i, self.momentsR);
		halfG = bottomG + self.top(cube, direction, i, self.momentsG);
		halfB = bottomB + self.top(cube, direction, i, self.momentsB);
		halfW = bottomW + self.top(cube, direction, i, self.weights);
		if (0 === halfW) continue;
		let tempNumerator = halfR * halfR + halfG * halfG + halfB * halfB,
			tempDenominator = 1 * halfW,
			temp = tempNumerator / tempDenominator;
		halfR = wholeR - halfR;
		halfG = wholeG - halfG;
		halfB = wholeB - halfB;
		halfW = wholeW - halfW;
		0 !== halfW &&
			((tempNumerator = halfR * halfR + halfG * halfG + halfB * halfB),
			(tempDenominator = 1 * halfW),
			(temp += tempNumerator / tempDenominator),
			temp > max && ((max = temp), (cut = i)));
	}
	return new MaximizeResult(cut, max);
}

export {
	clamp,
	sanitizeDegrees,
	delinearized,
	linearized,
	signum,
	variance,
	cut,
	maximize,
	filter,
	score
};
