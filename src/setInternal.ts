import { fromIntInViewingConditions, lstarFromInt } from './utils/convertions';
import { HCT } from './htc';

function setInternalState(self: HCT, argb: number) {
	const cam = fromIntInViewingConditions(argb);
	const tone = lstarFromInt(argb);
	self.internalHue = cam.hue;
	self.internalChroma = cam.chroma;
	self.internalTone = tone;
}

export default setInternalState;
