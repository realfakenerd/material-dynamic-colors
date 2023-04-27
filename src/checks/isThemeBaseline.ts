import isSameColor from './isSameColor';
import isTheme3p from './isTheme3p';
import { OneP, ThreeP } from '../baselines';
import { Luminance, Theme, groupName } from '../lib';

function isThemeBaseline(theme: Theme) {
	let match_ = !0;
	const target = isTheme3p(theme) ? ThreeP : OneP;

	function checkGroup(name: groupName, group: Luminance, targetGroup: Luminance) {
		if (match_) {
			let match: boolean;
			(match = isSameColor(group.luminance0, targetGroup.luminance0)) &&
				(match = isSameColor(group.luminance10, targetGroup.luminance10));
			match && (match = isSameColor(group.luminance20, targetGroup.luminance20));
			match && (match = isSameColor(group.luminance30, targetGroup.luminance30));
			match && (match = isSameColor(group.luminance40, targetGroup.luminance40));
			match && (match = isSameColor(group.luminance50, targetGroup.luminance50));
			match && (match = isSameColor(group.luminance60, targetGroup.luminance60));
			match && (match = isSameColor(group.luminance70, targetGroup.luminance70));
			match && (match = isSameColor(group.luminance80, targetGroup.luminance80));
			match && (match = isSameColor(group.luminance90, targetGroup.luminance90));
			match && (match = isSameColor(group.luminance95, targetGroup.luminance95));
			match && (match = isSameColor(group.luminance98, targetGroup.luminance98));
			match && (match = isSameColor(group.luminance100, targetGroup.luminance100));
			match_ = match;
		}
		match_ || console.debug(`theme adapter ${name} group mismatch`, group, targetGroup);
	}
	checkGroup('primary', theme.primary, target.primary);
	checkGroup('secondary', theme.secondary, target.secondary);
	checkGroup('tertiary', theme.tertiary, target.tertiary);
	checkGroup('neutral', theme.neutral, target.neutral);
	checkGroup('neutralVariant', theme.neutralVariant, target.neutralVariant);
	checkGroup('error', theme.error, target.error);
	console.debug(`theme adapter baseline match: ${match_}`);
	return match_;
}

export default isThemeBaseline;
