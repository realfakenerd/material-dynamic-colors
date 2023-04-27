import SafeUrlImpl from './SafeUrlImpl';
function safeUrlBuildersFromBlob(blob: Blob) {
	const match = blob.type.match(/^([^;]+)(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i);
	if (
		2 !== (null === match || void 0 === match ? void 0 : match.length) ||
		!(
			/^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)$/i.test(match[1]) ||
			/^video\/(?:mpeg|mp4|ogg|webm|x-matroska|quicktime|x-ms-wmv)$/i.test(match[1]) ||
			/^audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)$/i.test(
				match[1]
			)
		)
	)
		throw Error(`unsafe blob MIME type: ${blob.type}`);
	return new SafeUrlImpl(URL.createObjectURL(blob));
}

export default safeUrlBuildersFromBlob;
