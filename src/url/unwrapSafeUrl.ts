import SafeUrl from './SafeURL';
import SafeUrlImpl from './SafeUrlImpl';

function unwrapSafeUrl(url: SafeUrl | SafeUrlImpl) {
	let _temp;
	if (url instanceof SafeUrl)
		if (url instanceof SafeUrlImpl) _temp = url.privateDoNotAccessOrElseWrappedUrl;
		else throw Error('Unexpected type when unwrapping SafeUrl');
	// @ts-expect-error i dont know
	else _temp = unwrap(url);
	return _temp;
}

export default unwrapSafeUrl;
