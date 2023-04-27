import setInternalState from '../setInternal';
import { clamp, sanitizeDegrees } from '../utils/math';
import getIntInViewingConditions from './getIntInViewingConditions';

export default class HCT {
	constructor(
		public internalHue: number,
		public internalChroma: number,
		public internalTone: number
	) {
		setInternalState(this, this.toInt());
	}
	toInt() {
		return getIntInViewingConditions(
			sanitizeDegrees(this.internalHue),
			this.internalChroma,
			clamp(100, this.internalTone)
		);
	}
	get hue() {
		return this.internalHue;
	}
	set hue(newHue) {
		setInternalState(
			this,
			getIntInViewingConditions(
				sanitizeDegrees(sanitizeDegrees(newHue)),
				this.internalChroma,
				clamp(100, this.internalTone)
			)
		);
	}
	get chroma() {
		return this.internalChroma;
	}
	set chroma(newChroma) {
		setInternalState(
			this,
			getIntInViewingConditions(
				sanitizeDegrees(this.internalHue),
				newChroma,
				clamp(100, this.internalTone)
			)
		);
	}
	get tone() {
		return this.internalTone;
	}
	set tone(newTone) {
		setInternalState(
			this,
			getIntInViewingConditions(
				sanitizeDegrees(this.internalHue),
				this.internalChroma,
				clamp(100, newTone)
			)
		);
	}
}
