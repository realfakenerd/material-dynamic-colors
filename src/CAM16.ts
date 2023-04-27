export default class CAM16 {
	constructor(
		public hue: number,
		public chroma: number,
		public j: number,
		public q: number,
		public s: number,
		public jstar: number,
		public astar: number,
		public bstar: number
	) {}
	distance(other: CAM16) {
		const dJ = this.jstar - other.jstar;
		const dA = this.astar - other.astar;
		const dB = this.bstar - other.bstar;
		return 1.41 * Math.pow(Math.sqrt(dJ * dJ + dA * dA + dB * dB), 0.63);
	}
}
