import { numberToHex } from '../utils/color';
import type TonalPallete from '../TonalPallete';
import { Luminance } from '../lib';

function tonesToTonalGroup(tones: TonalPallete): Luminance {
	return {
		luminance100: numberToHex(tones.tone(100)),
		luminance99: numberToHex(tones.tone(99)),
		luminance98: numberToHex(tones.tone(98)),
		luminance95: numberToHex(tones.tone(95)),
		luminance90: numberToHex(tones.tone(90)),
		luminance80: numberToHex(tones.tone(80)),
		luminance70: numberToHex(tones.tone(70)),
		luminance60: numberToHex(tones.tone(60)),
		luminance50: numberToHex(tones.tone(50)),
		luminance40: numberToHex(tones.tone(40)),
		luminance35: numberToHex(tones.tone(35)),
		luminance30: numberToHex(tones.tone(30)),
		luminance25: numberToHex(tones.tone(25)),
		luminance20: numberToHex(tones.tone(20)),
		luminance10: numberToHex(tones.tone(10)),
		luminance0: numberToHex(tones.tone(0))
	};
}

export default tonesToTonalGroup;
