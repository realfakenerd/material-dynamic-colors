import tonesToTonalGroup from './tonesToTonalGroup';
import Flags from '../Flag';
import type TonalPalette from '../TonalPallete';
import type ThemeAdapterBase from '../ThemeAdapterBase';
import { type Luminance, groupName } from '../lib';

function getColorGroup(self: ThemeAdapterBase, key: groupName, tones: TonalPalette): Luminance | object {
	let _a: number | ThemeAdapterBase['tonalGroups'];

	const groups =
		null !== (_a = self.props.overrides.tonalGroups) && void 0 !== _a ? _a : {};
	const overrideGroup: object | undefined = Object(groups)[key];

	return (Flags.is1p && !self.props.isBaseline) || !overrideGroup
		? tonesToTonalGroup(tones)
		: overrideGroup;
}

export default getColorGroup;
