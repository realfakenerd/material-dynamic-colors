export default class Box {
	r0 = 0;
	r1: number;
	g0: number;
	g1: number;
	b0: number;
	b1: number;
	vol: number;

	constructor() {
		this.vol = this.b1 = this.b0 = this.g1 = this.g0 = this.r1 = this.r0;
	}
}
