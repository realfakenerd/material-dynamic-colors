import { MDCTheme } from './lib';
import seedFromImage from './seedFromImage';
import { fromColor } from './utils/convertions';

export function mDCFromHex(from: string): MDCTheme {
	if (!from.startsWith('#')) throw new Error('Must start with #');
	const theme = fromColor(from);

	return {
		light: theme.light,
		dark: theme.dark
	};
};

export async function materialDynamicColors(from: string | Blob | File | Event): Promise<MDCTheme> {
	let image = from;
	if (from instanceof Blob || from instanceof File) image = URL.createObjectURL(from);
	if ((from as Event).target && (from as Event).target.files[0])
		image = URL.createObjectURL(from.target.files[0]);
	if (from.files && from.files[0]) image = URL.createObjectURL(from.files[0]);

	const color = await seedFromImage(image as RequestInfo);
	const theme = fromColor(color);

	return {
		light: theme.light,
		dark: theme.dark
	};
}


