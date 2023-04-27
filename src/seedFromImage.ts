import { bufferToPixels } from './utils/image';
import { DistanceAndIndex, QuantizerWu, createBoxes } from './quantizer_wu';
import getIndex from './utils/getIndex';
import LabPointProvider from './LabPointProvider';
import { hexFromInt, labFromInt } from './utils/convertions';
import { score } from './utils/math';
async function seedFromImage(image: RequestInfo | URL) {
	const imageBuffer = typeof image === 'string' ? await (await fetch(image)).arrayBuffer() : image;
	const pixels = await bufferToPixels(imageBuffer as ArrayBuffer);
	const self = new QuantizerWu();

	let a;
	self.weights = Array.from<number>({
		length: 35937
	}).fill(0);
	self.momentsR = Array.from<number>({
		length: 35937
	}).fill(0);
	self.momentsG = Array.from<number>({
		length: 35937
	}).fill(0);
	self.momentsB = Array.from<number>({
		length: 35937
	}).fill(0);
	self.moments = Array.from<number>({
		length: 35937
	}).fill(0);
	let a_;
	const countByColor = new Map<number, number>();
	for (let i = 0; i < pixels.length; i++) {
		const pixel = pixels[i];
		255 > ((pixel & 4278190080) >> 24) >>> 0 ||
			countByColor.set(pixel, (null !== (a_ = countByColor.get(pixel)) && void 0 !== a_ ? a_ : 0) + 1);
	}

	for (const [
		pixel_tsickle_destructured_1,
		count_tsickle_destructured_2
	] of countByColor.entries()) {
		const pixel = pixel_tsickle_destructured_1;
		const count = count_tsickle_destructured_2;
		const red = (pixel & 16711680) >> 16;
		const green = (pixel & 65280) >> 8;
		const blue = pixel & 255;
		const index = getIndex((red >> 3) + 1, (green >> 3) + 1, (blue >> 3) + 1);

		self.weights[index] = (null !== (a = self.weights[index]) && void 0 !== a ? a : 0) + count;
		self.momentsR[index] += count * red;
		self.momentsG[index] += count * green;
		self.momentsB[index] += count * blue;
		self.moments[index] += count * (red * red + green * green + blue * blue);
	}

	for (let r = 1; 33 > r; r++) {
		const area = Array.from<number>({
			length: 33
		}).fill(0);
		const areaR = Array.from<number>({
			length: 33
		}).fill(0);
		const areaG = Array.from<number>({
			length: 33
		}).fill(0);
		const areaB = Array.from<number>({
			length: 33
		}).fill(0);
		const area2 = Array.from<number>({
			length: 33
		}).fill(0);

		for (let g = 1; 33 > g; g++) {
			let line = 0;
			let lineR = 0;
			let lineG = 0;
			let lineB = 0;
			let line2 = 0;
			for (let b = 1; 33 > b; b++) {
				const index = getIndex(r, g, b);
				line += self.weights[index];
				lineR += self.momentsR[index];
				lineG += self.momentsG[index];
				lineB += self.momentsB[index];
				line2 += self.moments[index];
				area[b] += line;
				areaR[b] += lineR;
				areaG[b] += lineG;
				areaB[b] += lineB;
				area2[b] += line2;
				const previousIndex = getIndex(r - 1, g, b);
				self.weights[index] = self.weights[previousIndex] + area[b];
				self.momentsR[index] = self.momentsR[previousIndex] + areaR[b];
				self.momentsG[index] = self.momentsG[previousIndex] + areaG[b];
				self.momentsB[index] = self.momentsB[previousIndex] + areaB[b];
				self.moments[index] = self.moments[previousIndex] + area2[b];
			}
		}
	}
	let colorCount = createBoxes(self).resultCount;
	const colors = [];
	for (let i = 0; i < colorCount; ++i) {
		const cube = self.cubes[i],
			weight = self.volume(cube, self.weights);
		if (0 < weight) {
			const r = Math.round(self.volume(cube, self.momentsR) / weight),
				g = Math.round(self.volume(cube, self.momentsG) / weight),
				b = Math.round(self.volume(cube, self.momentsB) / weight);
			colors.push(-16777216 | ((r & 255) << 16) | ((g & 255) << 8) | (b & 255));
		}
	}
	const pixelToCount = new Map(),
		points = [],
		pixels_ = [],
		pointProvider = new LabPointProvider();
	let pointCount = 0;
	for (let i = 0; i < pixels.length; i++) {
		const inputPixel = pixels[i],
			pixelCount = pixelToCount.get(inputPixel);
		void 0 === pixelCount
			? (pointCount++,
			  points.push(labFromInt(inputPixel)),
			  pixels_.push(inputPixel),
			  pixelToCount.set(inputPixel, 1))
			: pixelToCount.set(inputPixel, pixelCount + 1);
	}
	const counts = [];
	for (let i = 0; i < pointCount; i++) {
		const count = pixelToCount.get(pixels_[i]);
		void 0 !== count && (counts[i] = count);
	}
	let clusterCount = Math.min(256, pointCount);
	0 < colors.length && (clusterCount = Math.min(clusterCount, colors.length));
	const clusters = [];
	for (let i = 0; i < colors.length; i++) clusters.push(labFromInt(colors[i]));
	const additionalClustersNeeded = clusterCount - clusters.length;
	if (0 === colors.length && 0 < additionalClustersNeeded)
		for (let i = 0; i < additionalClustersNeeded; i++)
			clusters.push([100 * Math.random(), 201 * Math.random() + -100, 201 * Math.random() + -100]);
	const clusterIndices = [];
	for (let i = 0; i < pointCount; i++) clusterIndices.push(Math.floor(Math.random() * clusterCount));

	const indexMatrix: number[][] = [];

	for (let i = 0; i < clusterCount; i++) {
		indexMatrix.push([]);

		for (let j = 0; j < clusterCount; j++) indexMatrix[i].push(0);
	}

	const distanceToIndexMatrix: DistanceAndIndex[][] = [];

	for (let i = 0; i < clusterCount; i++) {
		distanceToIndexMatrix.push([]);

		for (let j = 0; j < clusterCount; j++) distanceToIndexMatrix[i].push(new DistanceAndIndex());
	}
	const pixelCountSums = [];
	for (let i = 0; i < clusterCount; i++) pixelCountSums.push(0);
	for (let iteration = 0; 10 > iteration; iteration++) {
		for (let i = 0; i < clusterCount; i++) {
			for (let j = i + 1; j < clusterCount; j++) {
				const distance = pointProvider.distance(clusters[i], clusters[j]);
				distanceToIndexMatrix[j][i].distance = distance;
				distanceToIndexMatrix[j][i].index = i;
				distanceToIndexMatrix[i][j].distance = distance;
				distanceToIndexMatrix[i][j].index = j;
			}
			distanceToIndexMatrix[i].sort();
			for (let j = 0; j < clusterCount; j++) indexMatrix[i][j] = distanceToIndexMatrix[i][j].index;
		}
		let pointsMoved = 0;
		for (let i = 0; i < pointCount; i++) {
			const point = points[i],
				previousClusterIndex = clusterIndices[i],
				previousDistance = pointProvider.distance(point, clusters[previousClusterIndex]);
			let minimumDistance = previousDistance,
				newClusterIndex = -1;
			for (let j = 0; j < clusterCount; j++) {
				if (distanceToIndexMatrix[previousClusterIndex][j].distance >= 4 * previousDistance) continue;
				const distance = pointProvider.distance(point, clusters[j]);
				distance < minimumDistance && ((minimumDistance = distance), (newClusterIndex = j));
			}
			-1 !== newClusterIndex &&
				3 < Math.abs(Math.sqrt(minimumDistance) - Math.sqrt(previousDistance)) &&
				(pointsMoved++, (clusterIndices[i] = newClusterIndex));
		}
		if (0 === pointsMoved && 0 !== iteration) break;
		const componentASums = Array(clusterCount).fill(0),
			componentBSums = Array(clusterCount).fill(0),
			componentCSums = Array(clusterCount).fill(0);
		for (let i = 0; i < clusterCount; i++) pixelCountSums[i] = 0;
		for (let i = 0; i < pointCount; i++) {
			const clusterIndex = clusterIndices[i],
				point = points[i],
				count = counts[i];
			pixelCountSums[clusterIndex] += count;
			componentASums[clusterIndex] += point[0] * count;
			componentBSums[clusterIndex] += point[1] * count;
			componentCSums[clusterIndex] += point[2] * count;
		}
		for (let i = 0; i < clusterCount; i++) {
			const count = pixelCountSums[i];
			clusters[i] =
				0 === count
					? [0, 0, 0]
					: [componentASums[i] / count, componentBSums[i] / count, componentCSums[i] / count];
		}
	}
	const argbToPopulation = new Map();
	for (let i = 0; i < clusterCount; i++) {
		const count = pixelCountSums[i];
		if (0 === count) continue;
		const possibleNewCluster = pointProvider.toInt(clusters[i]);
		argbToPopulation.has(possibleNewCluster) || argbToPopulation.set(possibleNewCluster, count);
	}
	const ranked = score(argbToPopulation);
	return hexFromInt(ranked[0]);
}
export default seedFromImage;
