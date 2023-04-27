import CorePalette from './CorePalette';
import ThemeAdapterBase from './ThemeAdapterBase';

export type groupName =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'neutral'
	| 'neutralVariant'
	| 'error';

export interface ThemeAdapterProps {
	tones: CorePalette;
	seed: number;
	is3p: boolean;
	overrides: ThemeAdapterBase;
	imageUrl: string;
	blend: boolean;
	isBaseline: boolean;
}


export interface Theme {
	seed: number;
	baseline: boolean;
	imageUrl: string;
	customColors: ThemeAdapterBase['customColors'];
	light: ThemeAdapterBase['light'];
	dark: ThemeAdapterBase['dark'];
	androidLight: ThemeAdapterBase['androidLight'];
	androidDark: ThemeAdapterBase['androidDark'];
	primary: ThemeAdapterBase['primary'];
	secondary: ThemeAdapterBase['secondary'];
	tertiary: ThemeAdapterBase['tertiary'];
	neutral: ThemeAdapterBase['neutral'];
	neutralVariant: ThemeAdapterBase['neutralVariant'];
	error: ThemeAdapterBase['error'];
	styles: ThemeAdapterBase['styles'];
	source: ThemeAdapterBase['source'];
}

export interface MDCTheme {
	light: MDCThemeColor;
	dark: MDCThemeColor;
}

export interface MDCThemeColor {
	primary: string;
	onPrimary: string;
	primaryContainer: string;
	onPrimaryContainer: string;
	secondary: string;
	onSecondary: string;
	secondaryContainer: string;
	onSecondaryContainer: string;
	tertiary: string;
	onTertiary: string;
	tertiaryContainer: string;
	onTertiaryContainer: string;
	error: string;
	errorContainer: string;
	onError: string;
	onErrorContainer: string;
	background: string;
	onBackground: string;
	surface: string;
	onSurface: string;
	surfaceVariant: string;
	onSurfaceVariant: string;
	outline: string;
	inverseOnSurface: string;
	inverseSurface: string;
	inversePrimary: string;
	shadow: string;
}

export interface Luminance {
	luminance100: string;
	luminance99: string;
	luminance98: string;
	luminance95: string;
	luminance90: string;
	luminance80: string;
	luminance70: string;
	luminance60: string;
	luminance50: string;
	luminance40: string;
	luminance35: string;
	luminance30: string;
	luminance25: string;
	luminance20: string;
	luminance10: string;
	luminance0: string;
}
