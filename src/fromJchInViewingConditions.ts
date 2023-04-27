import CAM16 from './CAM16';
import DEFAULT from './Default';

function fromJchInViewingConditions(j: number, c: number, h: number) {
	const hueRadians = (h * Math.PI) / 180;
	const mstar = (1 / 0.0228) * Math.log(1 + 0.0228 * c * DEFAULT.fLRoot);
	return new CAM16(
		h,
		c,
		j,
		(4 / DEFAULT.c) * Math.sqrt(j / 100) * (DEFAULT.aw + 4) * DEFAULT.fLRoot,
		50 * Math.sqrt(((c / Math.sqrt(j / 100)) * DEFAULT.c) / (DEFAULT.aw + 4)),
		((1 + 100 * 0.007) * j) / (1 + 0.007 * j),
		mstar * Math.cos(hueRadians),
		mstar * Math.sin(hueRadians)
	);
}

export default fromJchInViewingConditions;
