import { variance, cut } from '../utils/math';
import Box from './Box';
import CreateBoxesResult from './CreateBoxesResult';
import type QuantizerWu from './QuantizerWu';

function createBoxes(self: QuantizerWu) {
	self.cubes = Array.from({
		length: 256
	})
		.fill(0)
		.map(() => new Box());
	const volumeVariance = Array.from<number>({
		length: 256
	}).fill(0);
	self.cubes[0].r0 = 0;
	self.cubes[0].g0 = 0;
	self.cubes[0].b0 = 0;
	self.cubes[0].r1 = 32;
	self.cubes[0].g1 = 32;
	self.cubes[0].b1 = 32;
	let generatedColorCount = 256,
		next = 0;
	for (let i = 1; 256 > i; i++) {
		cut(self, self.cubes[next], self.cubes[i])
			? ((volumeVariance[next] = 1 < self.cubes[next].vol ? variance(self, self.cubes[next]) : 0),
			  (volumeVariance[i] = 1 < self.cubes[i].vol ? variance(self, self.cubes[i]) : 0))
			: ((volumeVariance[next] = 0), i--);
		next = 0;
		let temp = volumeVariance[0];
		for (let j = 1; j <= i; j++) volumeVariance[j] > temp && ((temp = volumeVariance[j]), (next = j));
		if (0 >= temp) {
			generatedColorCount = i + 1;
			break;
		}
	}
	return new CreateBoxesResult(generatedColorCount);
}

export default createBoxes;
