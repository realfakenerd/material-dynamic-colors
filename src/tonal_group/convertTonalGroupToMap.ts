import { Luminance } from '../lib';

type prefixes = 'P' | 'S' | 'T' | 'N' | 'NV' | 'E';
function convertTonalGroupToMap<P extends prefixes>(
	prefix: P,
	group: Luminance
) {
	const map = new Map<`${P}-${number}`, string>();
	map.set(`${prefix}-100`, group.luminance100);
	map.set(`${prefix}-99`, group.luminance99);
	map.set(`${prefix}-98`, group.luminance98);
	map.set(`${prefix}-95`, group.luminance95);
	map.set(`${prefix}-90`, group.luminance90);
	map.set(`${prefix}-80`, group.luminance80);
	map.set(`${prefix}-70`, group.luminance70);
	map.set(`${prefix}-60`, group.luminance60);
	map.set(`${prefix}-50`, group.luminance50);
	map.set(`${prefix}-40`, group.luminance40);
	map.set(`${prefix}-35`, group.luminance35);
	map.set(`${prefix}-30`, group.luminance30);
	map.set(`${prefix}-25`, group.luminance25);
	map.set(`${prefix}-20`, group.luminance20);
	map.set(`${prefix}-10`, group.luminance10);
	map.set(`${prefix}-0`, group.luminance0);
	return map;
}

export default convertTonalGroupToMap;
