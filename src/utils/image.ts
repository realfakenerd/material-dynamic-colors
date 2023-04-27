import { safeUrlBuildersFromBlob, unwrapSafeUrl } from '../url';
import { intFromRgb } from './convertions';

async function decodeToImageData(bytes: Uint8Array) {
	const url = safeUrlBuildersFromBlob(
		new Blob([bytes], {
			type: 'image/png'
		})
	);
	const image = await new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve(img);
		};
		img.onerror = () => {
			reject();
		};
		img.src = unwrapSafeUrl(url);
	});

	const cv = document.createElement('canvas');
	const ctx = cv.getContext('2d');

	if (ctx) {
		ctx.canvas.width = 112;
		ctx.canvas.height = 112;
		ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
		return ctx.getImageData(0, 0, image.width, image.height);
	}
}

async function bufferToPixels(buffer: ArrayBuffer) {
	const imageBytes = new Uint8Array(buffer);
	const imageData = await decodeToImageData(imageBytes);
	const pixels: number[] = [];
	if (imageData) {
		for (let i = 0; i < imageData.data.length; i += 4)
			255 > imageData.data[i + 3] ||
				pixels.push(intFromRgb([imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]]));
	}
	return pixels;
}

export { bufferToPixels };
