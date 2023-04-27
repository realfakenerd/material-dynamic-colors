import type ThemeAdapterBase from '../ThemeAdapterBase';

type prefixes = 'P' | 'S' | 'T' | 'N' | 'NV' | 'E';

function getPrimaryTonal<P extends prefixes>(self: ThemeAdapterBase, prefix: P, palettes: Map<string, string>) {
	return (null !== palettes && void 0 !== palettes ? palettes : self.palettes).get(`${prefix}-40`) as `${P}-40`;
}

export default getPrimaryTonal;
