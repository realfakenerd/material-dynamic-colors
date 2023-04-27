export default class Flags {
	static get internal() {
		return !1;
	}
	static get is3p() {
		return !this.internal;
	}
	static get is1p() {
		return this.internal;
	}
	static get enableDsp() {
		return !this.is1p;
	}
	static get enableAndroid() {
		return this.is1p;
	}
	static get enableWebExport() {
		return this.is3p;
	}
	static get enableExtendedColors() {
		return !0;
	}
	static get enableColorShift() {
		return this.is1p;
	}
}

const flags = Flags;
const SHOW_DSP = flags.enableDsp;
const SHOW_ANDROID = flags.enableAndroid;
const SHOW_WEB_EXPORT = flags.enableWebExport;
const ENABLE_EXTENDED_COLOR_SHIFT = flags.enableColorShift;

export { flags, SHOW_DSP, SHOW_ANDROID, SHOW_WEB_EXPORT, ENABLE_EXTENDED_COLOR_SHIFT };
