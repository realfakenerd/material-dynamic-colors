import viewed from '../viewed';
import { fromIntInViewingConditions, intFromLstar, lstarFromInt } from '../utils/convertions';
import { sanitizeDegrees } from '../utils/math';
import fromJchInViewingConditions from '../fromJchInViewingConditions';

function getIntInViewingConditions(hue_: number, chroma_: number, tone_: number) {
	if (1 > chroma_ || 0 >= Math.round(tone_) || 100 <= Math.round(tone_)) return intFromLstar(tone_);

	hue_ = sanitizeDegrees(hue_);

	let high = chroma_;
	let mid = chroma_;
	let low = 0;
	let isFirstLoop = !0;
	let answer = null;

	for (; 0.4 <= Math.abs(low - high); ) {
		const hue = hue_;
		const chroma = mid;
		const tone = tone_;

		let low_ = 0;
		let high_ = 100;
		let mid_;
		let bestdL = 1e3;
		let bestdE = 1e3;
		let bestCam = null;

		for (; 0.01 < Math.abs(low_ - high_); ) {
			mid_ = low_ + (high_ - low_) / 2;

			const clipped = viewed(fromJchInViewingConditions(mid_, chroma, hue));
			const clippedLstar = lstarFromInt(clipped);
			const dL = Math.abs(tone - clippedLstar);

			if (0.2 > dL) {
				const camClipped = fromIntInViewingConditions(clipped);
				const dE = camClipped.distance(
					fromJchInViewingConditions(camClipped.j, camClipped.chroma, hue)
				);

				1 >= dE && dE <= bestdE && ((bestdL = dL), (bestdE = dE), (bestCam = camClipped));
			}

			if (0 === bestdL && 0 === bestdE) break;

			clippedLstar < tone ? (low_ = mid_) : (high_ = mid_);
		}

		const possibleAnswer = bestCam;

		if (isFirstLoop) {
			if (null != possibleAnswer) return viewed(possibleAnswer);
			isFirstLoop = !1;
		} else null === possibleAnswer ? (high = mid) : ((answer = possibleAnswer), (low = mid));

		mid = low + (high - low) / 2;
	}
	return null === answer ? intFromLstar(tone_) : viewed(answer);
}

export default getIntInViewingConditions;
