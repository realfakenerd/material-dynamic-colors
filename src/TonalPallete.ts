import { HCT } from './htc';
export default class TonalPalette {
	cache = new Map<number, number>();
	constructor(public hue: number, public chroma: number) {}

	tone(tone: number) {
		let argb = this.cache.get(tone);
		void 0 === argb &&
			((argb = new HCT(this.hue, this.chroma, tone).toInt()), this.cache.set(tone, argb));
		return argb;
	}
}
