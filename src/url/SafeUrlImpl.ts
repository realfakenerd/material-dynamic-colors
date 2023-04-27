import SafeUrl from './SafeURL';
const secretToken = {};
export default class SafeUrlImpl extends SafeUrl {
	privateDoNotAccessOrElseWrappedUrl: string;

	constructor(url: string) {
		super();
		if (secretToken !== secretToken) throw Error('Bad secret');
		this.privateDoNotAccessOrElseWrappedUrl = url;
	}

	toString() {
		return this.privateDoNotAccessOrElseWrappedUrl;
	}
}
