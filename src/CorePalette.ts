import TonalPalette from './TonalPallete';
import { fromInt } from './utils/convertions';

export default class CorePalette {
	a1: TonalPalette;
	a2: TonalPalette;
	a3: TonalPalette;
	n1: TonalPalette;
	n2: TonalPalette;
	error: TonalPalette;

	constructor(argb: number) {
		const hct = fromInt(argb);
		const hue = hct.hue;
		this.a1 = new TonalPalette(hue, Math.max(48, hct.chroma));
		this.a2 = new TonalPalette(hue, 16);
		this.a3 = new TonalPalette(hue + 60, 24);
		this.n1 = new TonalPalette(hue, 4);
		this.n2 = new TonalPalette(hue, 8);
		this.error = new TonalPalette(25, 84);
	}
}
