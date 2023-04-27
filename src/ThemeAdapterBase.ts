import { OneP, ThreeP } from './baselines';
import { flags } from './Flag';
import { Luminance, MDCThemeColor, Theme, ThemeAdapterProps, groupName } from './lib';
import { isThemeBaseline } from './checks';
import { convertTonalGroupToMap, getColorGroup, getPrimaryTonal } from './tonal_group';
import { numberToHex } from './utils/color';
export default class ThemeAdapterBase {
	constructor(public props: ThemeAdapterProps) { }

	get isBaseline() {
		return isThemeBaseline(this.save());
	}

	get is3p() {
		return this.props.is3p;
	}

	get styles() {
		return this.props.is3p ? ThreeP.styles : OneP.styles;
	}

	get imageUrl() {
		return this.props.imageUrl;
	}

	get light() {
		let _a: ThemeAdapterBase | typeof OneP | typeof ThreeP;
		let _b: ThemeAdapterBase;
		let _c: ThemeAdapterBase;
		const overrides: MDCThemeColor = this.props.isBaseline
			? null === (_a = flags.is1p ? OneP : ThreeP) || void 0 === _a
				? void 0
				: _a.light
			: null !== (_c = null === (_b = this.props.overrides) || void 0 === _b ? void 0 : _b.light) &&
				void 0 !== _c
				? _c
				: {} as MDCThemeColor;
		const _p = this.palettes;
		let a: string = '';
		let b: string;
		let c: string;
		let d: string;
		let e: string;
		let f: string;
		let g: string;
		let h: string;
		let j: string;
		let k: string;
		let l: string;
		let m: string;
		let o: string;
		let p: string;
		let q: string;
		let r: string;
		let s: string;
		let t: string;
		let u: string;
		let v: string;
		let w: string;
		let x: string;
		let y: string;
		let z: string;
		let _0;
		let _1;
		let _2;
		return {
			primary:
				null !== (a = null === overrides || void 0 === overrides ? void 0 : overrides.primary) &&
					void 0 !== a
					? a
					: _p.get('P-40'),
			onPrimary:
				null !== (b = null === overrides || void 0 === overrides ? void 0 : overrides.onPrimary) &&
					void 0 !== b
					? b
					: _p.get('P-100'),
			primaryContainer:
				null !==
					(c = null === overrides || void 0 === overrides ? void 0 : overrides.primaryContainer) &&
					void 0 !== c
					? c
					: _p.get('P-90'),
			onPrimaryContainer:
				null !==
					(d = null === overrides || void 0 === overrides ? void 0 : overrides.onPrimaryContainer) &&
					void 0 !== d
					? d
					: _p.get('P-10'),
			secondary:
				null !== (e = null === overrides || void 0 === overrides ? void 0 : overrides.secondary) &&
					void 0 !== e
					? e
					: _p.get('S-40'),
			onSecondary:
				null !== (f = null === overrides || void 0 === overrides ? void 0 : overrides.onSecondary) &&
					void 0 !== f
					? f
					: _p.get('S-100'),
			secondaryContainer:
				null !==
					(g = null === overrides || void 0 === overrides ? void 0 : overrides.secondaryContainer) &&
					void 0 !== g
					? g
					: _p.get('S-90'),
			onSecondaryContainer:
				null !==
					(h = null === overrides || void 0 === overrides ? void 0 : overrides.onSecondaryContainer) &&
					void 0 !== h
					? h
					: _p.get('S-10'),
			tertiary:
				null !== (j = null === overrides || void 0 === overrides ? void 0 : overrides.tertiary) &&
					void 0 !== j
					? j
					: _p.get('T-40'),
			onTertiary:
				null !== (k = null === overrides || void 0 === overrides ? void 0 : overrides.onTertiary) &&
					void 0 !== k
					? k
					: _p.get('T-100'),
			tertiaryContainer:
				null !==
					(l = null === overrides || void 0 === overrides ? void 0 : overrides.tertiaryContainer) &&
					void 0 !== l
					? l
					: _p.get('T-90'),
			onTertiaryContainer:
				null !==
					(m = null === overrides || void 0 === overrides ? void 0 : overrides.onTertiaryContainer) &&
					void 0 !== m
					? m
					: _p.get('T-10'),
			error:
				null !== (o = null === overrides || void 0 === overrides ? void 0 : overrides.error) &&
					void 0 !== o
					? o
					: _p.get('E-40'),
			errorContainer:
				null !== (p = null === overrides || void 0 === overrides ? void 0 : overrides.errorContainer) &&
					void 0 !== p
					? p
					: _p.get('E-90'),
			onError:
				null !== (q = null === overrides || void 0 === overrides ? void 0 : overrides.onError) &&
					void 0 !== q
					? q
					: _p.get('E-100'),
			onErrorContainer:
				null !==
					(r = null === overrides || void 0 === overrides ? void 0 : overrides.onErrorContainer) &&
					void 0 !== r
					? r
					: _p.get('E-10'),
			background:
				null !== (s = null === overrides || void 0 === overrides ? void 0 : overrides.background) &&
					void 0 !== s
					? s
					: _p.get('N-99'),
			onBackground:
				null !== (t = null === overrides || void 0 === overrides ? void 0 : overrides.onBackground) &&
					void 0 !== t
					? t
					: _p.get('N-10'),
			surface:
				null !== (u = null === overrides || void 0 === overrides ? void 0 : overrides.surface) &&
					void 0 !== u
					? u
					: _p.get('N-99'),
			onSurface:
				null !== (v = null === overrides || void 0 === overrides ? void 0 : overrides.onSurface) &&
					void 0 !== v
					? v
					: _p.get('N-10'),
			surfaceVariant:
				null !== (w = null === overrides || void 0 === overrides ? void 0 : overrides.surfaceVariant) &&
					void 0 !== w
					? w
					: _p.get('NV-90'),
			onSurfaceVariant:
				null !==
					(x = null === overrides || void 0 === overrides ? void 0 : overrides.onSurfaceVariant) &&
					void 0 !== x
					? x
					: _p.get('NV-30'),
			outline:
				null !== (y = null === overrides || void 0 === overrides ? void 0 : overrides.outline) &&
					void 0 !== y
					? y
					: _p.get('NV-50'),
			inverseOnSurface:
				null !==
					(z = null === overrides || void 0 === overrides ? void 0 : overrides.inverseOnSurface) &&
					void 0 !== z
					? z
					: _p.get('N-95'),
			inverseSurface:
				null !==
					(_0 = null === overrides || void 0 === overrides ? void 0 : overrides.inverseSurface) &&
					void 0 !== _0
					? _0
					: _p.get('N-20'),
			inversePrimary:
				null !==
					(_1 = null === overrides || void 0 === overrides ? void 0 : overrides.inversePrimary) &&
					void 0 !== _1
					? _1
					: _p.get('P-80'),
			shadow:
				null !== (_2 = null === overrides || void 0 === overrides ? void 0 : overrides.shadow) &&
					void 0 !== _2
					? _2
					: _p.get('N-0')
		} as MDCThemeColor;
	}
	get dark() {
		let _a, _b, _c;
		const overrides = this.props.isBaseline
			? null === (_a = flags.is1p ? OneP : ThreeP) || void 0 === _a
				? void 0
				: _a.dark
			: null !== (_c = null === (_b = this.props.overrides) || void 0 === _b ? void 0 : _b.dark) &&
				void 0 !== _c
				? _c
				: {};
		const _p = this.palettes;
		let a;
		let b;
		let c;
		let d;
		let e;
		let f;
		let g;
		let h;
		let j;
		let k;
		let l;
		let m;
		let o;
		let p;
		let q;
		let r;
		let s;
		let t;
		let u;
		let v;
		let w;
		let x;
		let y;
		let z;
		let _0;
		let _1;
		let _2;
		return {
			primary:
				null !== (a = null === overrides || void 0 === overrides ? void 0 : overrides.primary) &&
					void 0 !== a
					? a
					: _p.get('P-80'),
			onPrimary:
				null !== (b = null === overrides || void 0 === overrides ? void 0 : overrides.onPrimary) &&
					void 0 !== b
					? b
					: _p.get('P-20'),
			primaryContainer:
				null !==
					(c = null === overrides || void 0 === overrides ? void 0 : overrides.primaryContainer) &&
					void 0 !== c
					? c
					: _p.get('P-30'),
			onPrimaryContainer:
				null !==
					(d = null === overrides || void 0 === overrides ? void 0 : overrides.onPrimaryContainer) &&
					void 0 !== d
					? d
					: _p.get('P-90'),
			secondary:
				null !== (e = null === overrides || void 0 === overrides ? void 0 : overrides.secondary) &&
					void 0 !== e
					? e
					: _p.get('S-80'),
			onSecondary:
				null !== (f = null === overrides || void 0 === overrides ? void 0 : overrides.onSecondary) &&
					void 0 !== f
					? f
					: _p.get('S-20'),
			secondaryContainer:
				null !==
					(g = null === overrides || void 0 === overrides ? void 0 : overrides.secondaryContainer) &&
					void 0 !== g
					? g
					: _p.get('S-30'),
			onSecondaryContainer:
				null !==
					(h = null === overrides || void 0 === overrides ? void 0 : overrides.onSecondaryContainer) &&
					void 0 !== h
					? h
					: _p.get('S-90'),
			tertiary:
				null !== (j = null === overrides || void 0 === overrides ? void 0 : overrides.tertiary) &&
					void 0 !== j
					? j
					: _p.get('T-80'),
			onTertiary:
				null !== (k = null === overrides || void 0 === overrides ? void 0 : overrides.onTertiary) &&
					void 0 !== k
					? k
					: _p.get('T-20'),
			tertiaryContainer:
				null !==
					(l = null === overrides || void 0 === overrides ? void 0 : overrides.tertiaryContainer) &&
					void 0 !== l
					? l
					: _p.get('T-30'),
			onTertiaryContainer:
				null !==
					(m = null === overrides || void 0 === overrides ? void 0 : overrides.onTertiaryContainer) &&
					void 0 !== m
					? m
					: _p.get('T-90'),
			error:
				null !== (o = null === overrides || void 0 === overrides ? void 0 : overrides.error) &&
					void 0 !== o
					? o
					: _p.get('E-80'),
			errorContainer:
				null !== (p = null === overrides || void 0 === overrides ? void 0 : overrides.errorContainer) &&
					void 0 !== p
					? p
					: _p.get('E-30'),
			onError:
				null !== (q = null === overrides || void 0 === overrides ? void 0 : overrides.onError) &&
					void 0 !== q
					? q
					: _p.get('E-20'),
			onErrorContainer:
				null !==
					(r = null === overrides || void 0 === overrides ? void 0 : overrides.onErrorContainer) &&
					void 0 !== r
					? r
					: _p.get('E-90'),
			background:
				null !== (s = null === overrides || void 0 === overrides ? void 0 : overrides.background) &&
					void 0 !== s
					? s
					: _p.get('N-10'),
			onBackground:
				null !== (t = null === overrides || void 0 === overrides ? void 0 : overrides.onBackground) &&
					void 0 !== t
					? t
					: _p.get('N-90'),
			surface:
				null !== (u = null === overrides || void 0 === overrides ? void 0 : overrides.surface) &&
					void 0 !== u
					? u
					: _p.get('N-10'),
			onSurface:
				null !== (v = null === overrides || void 0 === overrides ? void 0 : overrides.onSurface) &&
					void 0 !== v
					? v
					: _p.get('N-90'),
			surfaceVariant:
				null !== (w = null === overrides || void 0 === overrides ? void 0 : overrides.surfaceVariant) &&
					void 0 !== w
					? w
					: _p.get('NV-30'),
			onSurfaceVariant:
				null !==
					(x = null === overrides || void 0 === overrides ? void 0 : overrides.onSurfaceVariant) &&
					void 0 !== x
					? x
					: _p.get('NV-80'),
			outline:
				null !== (y = null === overrides || void 0 === overrides ? void 0 : overrides.outline) &&
					void 0 !== y
					? y
					: _p.get('NV-60'),
			inverseOnSurface:
				null !==
					(z = null === overrides || void 0 === overrides ? void 0 : overrides.inverseOnSurface) &&
					void 0 !== z
					? z
					: _p.get('N-10'),
			inverseSurface:
				null !==
					(_0 = null === overrides || void 0 === overrides ? void 0 : overrides.inverseSurface) &&
					void 0 !== _0
					? _0
					: _p.get('N-90'),
			inversePrimary:
				null !==
					(_1 = null === overrides || void 0 === overrides ? void 0 : overrides.inversePrimary) &&
					void 0 !== _1
					? _1
					: _p.get('P-40'),
			shadow:
				null !== (_2 = null === overrides || void 0 === overrides ? void 0 : overrides.shadow) &&
					void 0 !== _2
					? _2
					: _p.get('N-0')
		} as MDCThemeColor;
	}
	get androidLight() {
		let _a,
			_p = this.palettes,
			key = this.props.tones,
			colors = null === (_a = this.props.overrides) || void 0 === _a ? void 0 : _a.androidLight,
			a,
			b,
			c,
			d,
			e,
			f,
			g,
			h,
			j,
			k,
			l,
			m,
			o,
			p,
			q,
			r,
			s,
			t,
			u,
			v,
			w,
			x,
			y,
			z,
			_0,
			_1,
			_2,
			_3,
			_4,
			_5,
			_6,
			_7,
			_8,
			_9,
			_10,
			_11,
			_12,
			_13,
			_14,
			_15,
			_16,
			_17,
			_18,
			_19,
			_20,
			_21,
			_22,
			_23,
			_24,
			_25;
		return {
			colorAccentPrimary:
				null !==
					(b =
						null !== (a = null === colors || void 0 === colors ? void 0 : colors.colorAccentPrimary) &&
							void 0 !== a
							? a
							: _p.get('P-90')) && void 0 !== b
					? b
					: numberToHex(key.a1.tone(90)),
			colorAccentPrimaryVariant:
				null !==
					(d =
						null !==
							(c = null === colors || void 0 === colors ? void 0 : colors.colorAccentPrimaryVariant) &&
							void 0 !== c
							? c
							: _p.get('P-40')) && void 0 !== d
					? d
					: numberToHex(key.a1.tone(40)),
			colorAccentSecondary:
				null !==
					(f =
						null !== (e = null === colors || void 0 === colors ? void 0 : colors.colorAccentSecondary) &&
							void 0 !== e
							? e
							: _p.get('S-90')) && void 0 !== f
					? f
					: numberToHex(key.a2.tone(90)),
			colorAccentSecondaryVariant:
				null !==
					(h =
						null !==
							(g = null === colors || void 0 === colors ? void 0 : colors.colorAccentSecondaryVariant) &&
							void 0 !== g
							? g
							: _p.get('S-40')) && void 0 !== h
					? h
					: numberToHex(key.a2.tone(40)),
			colorAccentTertiary:
				null !==
					(k =
						null !== (j = null === colors || void 0 === colors ? void 0 : colors.colorAccentTertiary) &&
							void 0 !== j
							? j
							: _p.get('T-90')) && void 0 !== k
					? k
					: numberToHex(key.a3.tone(90)),
			colorAccentTertiaryVariant:
				null !==
					(m =
						null !==
							(l = null === colors || void 0 === colors ? void 0 : colors.colorAccentTertiaryVariant) &&
							void 0 !== l
							? l
							: _p.get('T-40')) && void 0 !== m
					? m
					: numberToHex(key.a3.tone(40)),
			textColorPrimary:
				null !==
					(p =
						null !== (o = null === colors || void 0 === colors ? void 0 : colors.textColorPrimary) &&
							void 0 !== o
							? o
							: _p.get('N-10')) && void 0 !== p
					? p
					: numberToHex(key.n1.tone(10)),
			textColorSecondary:
				null !==
					(r =
						null !== (q = null === colors || void 0 === colors ? void 0 : colors.textColorSecondary) &&
							void 0 !== q
							? q
							: _p.get('NV-30')) && void 0 !== r
					? r
					: numberToHex(key.n2.tone(30)),
			textColorTertiary:
				null !==
					(t =
						null !== (s = null === colors || void 0 === colors ? void 0 : colors.textColorTertiary) &&
							void 0 !== s
							? s
							: _p.get('NV-50')) && void 0 !== t
					? t
					: numberToHex(key.n2.tone(50)),
			textColorPrimaryInverse:
				null !==
					(v =
						null !==
							(u = null === colors || void 0 === colors ? void 0 : colors.textColorPrimaryInverse) &&
							void 0 !== u
							? u
							: _p.get('N-95')) && void 0 !== v
					? v
					: numberToHex(key.n1.tone(95)),
			textColorSecondaryInverse:
				null !==
					(x =
						null !==
							(w = null === colors || void 0 === colors ? void 0 : colors.textColorSecondaryInverse) &&
							void 0 !== w
							? w
							: _p.get('N-80')) && void 0 !== x
					? x
					: numberToHex(key.n1.tone(80)),
			textColorTertiaryInverse:
				null !==
					(z =
						null !==
							(y = null === colors || void 0 === colors ? void 0 : colors.textColorTertiaryInverse) &&
							void 0 !== y
							? y
							: _p.get('N-60')) && void 0 !== z
					? z
					: numberToHex(key.n1.tone(60)),
			colorBackground:
				null !==
					(_1 =
						null !== (_0 = null === colors || void 0 === colors ? void 0 : colors.colorBackground) &&
							void 0 !== _0
							? _0
							: _p.get('N-95')) && void 0 !== _1
					? _1
					: numberToHex(key.n1.tone(95)),
			colorBackgroundFloating:
				null !==
					(_3 =
						null !==
							(_2 = null === colors || void 0 === colors ? void 0 : colors.colorBackgroundFloating) &&
							void 0 !== _2
							? _2
							: _p.get('N-98')) && void 0 !== _3
					? _3
					: numberToHex(key.n1.tone(98)),
			colorSurface:
				null !==
					(_5 =
						null !== (_4 = null === colors || void 0 === colors ? void 0 : colors.colorSurface) &&
							void 0 !== _4
							? _4
							: _p.get('N-98')) && void 0 !== _5
					? _5
					: numberToHex(key.n1.tone(98)),
			colorSurfaceVariant:
				null !==
					(_7 =
						null !== (_6 = null === colors || void 0 === colors ? void 0 : colors.colorSurfaceVariant) &&
							void 0 !== _6
							? _6
							: _p.get('N-90')) && void 0 !== _7
					? _7
					: numberToHex(key.n1.tone(90)),
			colorSurfaceHighlight:
				null !==
					(_9 =
						null !==
							(_8 = null === colors || void 0 === colors ? void 0 : colors.colorSurfaceHighlight) &&
							void 0 !== _8
							? _8
							: _p.get('N-100')) && void 0 !== _9
					? _9
					: numberToHex(key.n1.tone(100)),
			surfaceHeader:
				null !==
					(_11 =
						null !== (_10 = null === colors || void 0 === colors ? void 0 : colors.surfaceHeader) &&
							void 0 !== _10
							? _10
							: _p.get('N-90')) && void 0 !== _11
					? _11
					: numberToHex(key.n1.tone(90)),
			underSurface:
				null !==
					(_13 =
						null !== (_12 = null === colors || void 0 === colors ? void 0 : colors.underSurface) &&
							void 0 !== _12
							? _12
							: _p.get('N-0')) && void 0 !== _13
					? _13
					: numberToHex(key.n1.tone(0)),
			offState:
				null !==
					(_15 =
						null !== (_14 = null === colors || void 0 === colors ? void 0 : colors.offState) &&
							void 0 !== _14
							? _14
							: _p.get('N-20')) && void 0 !== _15
					? _15
					: numberToHex(key.n1.tone(20)),
			accentSurface:
				null !==
					(_17 =
						null !== (_16 = null === colors || void 0 === colors ? void 0 : colors.accentSurface) &&
							void 0 !== _16
							? _16
							: _p.get('NV-95')) && void 0 !== _17
					? _17
					: numberToHex(key.a2.tone(95)),
			textPrimaryOnAccent:
				null !==
					(_19 =
						null !== (_18 = null === colors || void 0 === colors ? void 0 : colors.textPrimaryOnAccent) &&
							void 0 !== _18
							? _18
							: _p.get('N-10')) && void 0 !== _19
					? _19
					: numberToHex(key.n1.tone(10)),
			textSecondaryOnAccent:
				null !==
					(_21 =
						null !==
							(_20 = null === colors || void 0 === colors ? void 0 : colors.textSecondaryOnAccent) &&
							void 0 !== _20
							? _20
							: _p.get('NV-30')) && void 0 !== _21
					? _21
					: numberToHex(key.n2.tone(30)),
			volumeBackground:
				null !==
					(_23 =
						null !== (_22 = null === colors || void 0 === colors ? void 0 : colors.volumeBackground) &&
							void 0 !== _22
							? _22
							: _p.get('N-25')) && void 0 !== _23
					? _23
					: numberToHex(key.n1.tone(25)),
			scrim:
				null !==
					(_25 =
						null !== (_24 = null === colors || void 0 === colors ? void 0 : colors.scrim) &&
							void 0 !== _24
							? _24
							: _p.get('N-80')) && void 0 !== _25
					? _25
					: numberToHex(key.n1.tone(80))
		};
	}

	get androidDark() {
		var _a,
			_p = this.palettes,
			key = this.props.tones,
			colors = null === (_a = this.props.overrides) || void 0 === _a ? void 0 : _a.androidDark,
			a,
			b,
			c,
			d,
			e,
			f,
			g,
			h,
			j,
			k,
			l,
			m,
			o,
			p,
			q,
			r,
			s,
			t,
			u,
			v,
			w,
			x,
			y,
			z,
			_0,
			_1,
			_2,
			_3,
			_4,
			_5,
			_6,
			_7,
			_8,
			_9,
			_10,
			_11,
			_12,
			_13,
			_14,
			_15,
			_16,
			_17,
			_18,
			_19,
			_20,
			_21,
			_22,
			_23,
			_24,
			_25;
		return {
			colorAccentPrimary:
				null !==
					(b =
						null !== (a = null === colors || void 0 === colors ? void 0 : colors.colorAccentPrimary) &&
							void 0 !== a
							? a
							: _p.get('P-90')) && void 0 !== b
					? b
					: numberToHex(key.a1.tone(90)),
			colorAccentPrimaryVariant:
				null !==
					(d =
						null !==
							(c = null === colors || void 0 === colors ? void 0 : colors.colorAccentPrimaryVariant) &&
							void 0 !== c
							? c
							: _p.get('P-70')) && void 0 !== d
					? d
					: numberToHex(key.a1.tone(70)),
			colorAccentSecondary:
				null !==
					(f =
						null !== (e = null === colors || void 0 === colors ? void 0 : colors.colorAccentSecondary) &&
							void 0 !== e
							? e
							: _p.get('S-90')) && void 0 !== f
					? f
					: numberToHex(key.a2.tone(90)),
			colorAccentSecondaryVariant:
				null !==
					(h =
						null !==
							(g = null === colors || void 0 === colors ? void 0 : colors.colorAccentSecondaryVariant) &&
							void 0 !== g
							? g
							: _p.get('S-70')) && void 0 !== h
					? h
					: numberToHex(key.a2.tone(70)),
			colorAccentTertiary:
				null !==
					(k =
						null !== (j = null === colors || void 0 === colors ? void 0 : colors.colorAccentTertiary) &&
							void 0 !== j
							? j
							: _p.get('T-90')) && void 0 !== k
					? k
					: numberToHex(key.a3.tone(90)),
			colorAccentTertiaryVariant:
				null !==
					(m =
						null !==
							(l = null === colors || void 0 === colors ? void 0 : colors.colorAccentTertiaryVariant) &&
							void 0 !== l
							? l
							: _p.get('T-70')) && void 0 !== m
					? m
					: numberToHex(key.a3.tone(70)),
			textColorPrimary:
				null !==
					(p =
						null !== (o = null === colors || void 0 === colors ? void 0 : colors.textColorPrimary) &&
							void 0 !== o
							? o
							: _p.get('N-95')) && void 0 !== p
					? p
					: numberToHex(key.n1.tone(95)),
			textColorSecondary:
				null !==
					(r =
						null !== (q = null === colors || void 0 === colors ? void 0 : colors.textColorSecondary) &&
							void 0 !== q
							? q
							: _p.get('NV-80')) && void 0 !== r
					? r
					: numberToHex(key.n2.tone(80)),
			textColorTertiary:
				null !==
					(t =
						null !== (s = null === colors || void 0 === colors ? void 0 : colors.textColorTertiary) &&
							void 0 !== s
							? s
							: _p.get('NV-60')) && void 0 !== t
					? t
					: numberToHex(key.n2.tone(60)),
			textColorPrimaryInverse:
				null !==
					(v =
						null !==
							(u = null === colors || void 0 === colors ? void 0 : colors.textColorPrimaryInverse) &&
							void 0 !== u
							? u
							: _p.get('N-10')) && void 0 !== v
					? v
					: numberToHex(key.n1.tone(10)),
			textColorSecondaryInverse:
				null !==
					(x =
						null !==
							(w = null === colors || void 0 === colors ? void 0 : colors.textColorSecondaryInverse) &&
							void 0 !== w
							? w
							: _p.get('N-30')) && void 0 !== x
					? x
					: numberToHex(key.n1.tone(30)),
			textColorTertiaryInverse:
				null !==
					(z =
						null !==
							(y = null === colors || void 0 === colors ? void 0 : colors.textColorTertiaryInverse) &&
							void 0 !== y
							? y
							: _p.get('N-50')) && void 0 !== z
					? z
					: numberToHex(key.n1.tone(50)),
			colorBackground:
				null !==
					(_1 =
						null !== (_0 = null === colors || void 0 === colors ? void 0 : colors.colorBackground) &&
							void 0 !== _0
							? _0
							: _p.get('N-10')) && void 0 !== _1
					? _1
					: numberToHex(key.n1.tone(10)),
			colorBackgroundFloating:
				null !==
					(_3 =
						null !==
							(_2 = null === colors || void 0 === colors ? void 0 : colors.colorBackgroundFloating) &&
							void 0 !== _2
							? _2
							: _p.get('N-10')) && void 0 !== _3
					? _3
					: numberToHex(key.n1.tone(10)),
			colorSurface:
				null !==
					(_5 =
						null !== (_4 = null === colors || void 0 === colors ? void 0 : colors.colorSurface) &&
							void 0 !== _4
							? _4
							: _p.get('N-20')) && void 0 !== _5
					? _5
					: numberToHex(key.n1.tone(20)),
			colorSurfaceVariant:
				null !==
					(_7 =
						null !== (_6 = null === colors || void 0 === colors ? void 0 : colors.colorSurfaceVariant) &&
							void 0 !== _6
							? _6
							: _p.get('N-30')) && void 0 !== _7
					? _7
					: numberToHex(key.n1.tone(30)),
			colorSurfaceHighlight:
				null !==
					(_9 =
						null !==
							(_8 = null === colors || void 0 === colors ? void 0 : colors.colorSurfaceHighlight) &&
							void 0 !== _8
							? _8
							: _p.get('N-35')) && void 0 !== _9
					? _9
					: numberToHex(key.n1.tone(35)),
			surfaceHeader:
				null !==
					(_11 =
						null !== (_10 = null === colors || void 0 === colors ? void 0 : colors.surfaceHeader) &&
							void 0 !== _10
							? _10
							: _p.get('N-30')) && void 0 !== _11
					? _11
					: numberToHex(key.n1.tone(30)),
			underSurface:
				null !==
					(_13 =
						null !== (_12 = null === colors || void 0 === colors ? void 0 : colors.underSurface) &&
							void 0 !== _12
							? _12
							: _p.get('N-0')) && void 0 !== _13
					? _13
					: numberToHex(key.n1.tone(0)),
			offState:
				null !==
					(_15 =
						null !== (_14 = null === colors || void 0 === colors ? void 0 : colors.offState) &&
							void 0 !== _14
							? _14
							: _p.get('N-20')) && void 0 !== _15
					? _15
					: numberToHex(key.n1.tone(20)),
			accentSurface:
				null !==
					(_17 =
						null !== (_16 = null === colors || void 0 === colors ? void 0 : colors.accentSurface) &&
							void 0 !== _16
							? _16
							: _p.get('NV-95')) && void 0 !== _17
					? _17
					: numberToHex(key.a2.tone(95)),
			textPrimaryOnAccent:
				null !==
					(_19 =
						null !== (_18 = null === colors || void 0 === colors ? void 0 : colors.textPrimaryOnAccent) &&
							void 0 !== _18
							? _18
							: _p.get('N-10')) && void 0 !== _19
					? _19
					: numberToHex(key.n1.tone(10)),
			textSecondaryOnAccent:
				null !==
					(_21 =
						null !==
							(_20 = null === colors || void 0 === colors ? void 0 : colors.textSecondaryOnAccent) &&
							void 0 !== _20
							? _20
							: _p.get('NV-30')) && void 0 !== _21
					? _21
					: numberToHex(key.n2.tone(30)),
			volumeBackground:
				null !==
					(_23 =
						null !== (_22 = null === colors || void 0 === colors ? void 0 : colors.volumeBackground) &&
							void 0 !== _22
							? _22
							: _p.get('N-25')) && void 0 !== _23
					? _23
					: numberToHex(key.n1.tone(25)),
			scrim:
				null !==
					(_25 =
						null !== (_24 = null === colors || void 0 === colors ? void 0 : colors.scrim) &&
							void 0 !== _24
							? _24
							: _p.get('N-80')) && void 0 !== _25
					? _25
					: numberToHex(key.n1.tone(80))
		};
	}

	get tonalGroups(): Record<groupName, Luminance> & Record<string, string> {
		return Object.assign(
			{
				primary: this.primaryGroup,
				secondary: this.secondaryGroup,
				tertiary: this.tertiaryGroup,
				neutral: this.neutralGroup,
				neutralVariant: this.neutralVariantGroup,
				error: this.errorGroup
			},
			this.props.overrides.tonalGroups
		);
	}

	get primaryGroup() {
		return getColorGroup(this, 'primary', this.props.tones.a1);
	}

	get secondaryGroup() {
		return getColorGroup(this, 'secondary', this.props.tones.a2);
	}

	get tertiaryGroup() {
		return getColorGroup(this, 'tertiary', this.props.tones.a3);
	}

	get neutralGroup() {
		return getColorGroup(this, 'neutral', this.props.tones.n1);
	}

	get neutralVariantGroup() {
		return getColorGroup(this, 'neutralVariant', this.props.tones.n2);
	}

	get errorGroup() {
		return getColorGroup(this, 'error', this.props.tones.error);
	}

	get primary() {
		return convertTonalGroupToMap('P', this.primaryGroup as Luminance);
	}

	get secondary() {
		return convertTonalGroupToMap('S', this.secondaryGroup as Luminance);
	}

	get tertiary() {
		return convertTonalGroupToMap('T', this.tertiaryGroup as Luminance);
	}

	get neutral() {
		return convertTonalGroupToMap('N', this.neutralGroup as Luminance);
	}

	get neutralVariant() {
		return convertTonalGroupToMap('NV', this.neutralVariantGroup as Luminance);
	}

	get error() {
		return convertTonalGroupToMap('E', this.errorGroup as Luminance);
	}

	get palettes() {
		let entries: [string, string][] = [];
		entries = entries.concat(Array.from(this.primary.entries()));
		entries = entries.concat(Array.from(this.secondary.entries()));
		entries = entries.concat(Array.from(this.tertiary.entries()));
		entries = entries.concat(Array.from(this.neutral.entries()));
		entries = entries.concat(Array.from(this.neutralVariant.entries()));
		entries = entries.concat(Array.from(this.error.entries()));
		return new Map(entries);
	}

	get seedValue() {
		return this.props.seed;
	}

	get source(): ThemeAdapterBase {
		let _a, _b, _c, _d, _e, _f;
		const p = this.palettes;
		const source = this.props.overrides.source;

		return Object.assign(Object.assign({}, source), {
			seed: this.seedValue,
			imageUrl: this.imageUrl,
			primary:
				null !== (_a = null === source || void 0 === source ? void 0 : source.primary) && void 0 !== _a
					? _a
					: getPrimaryTonal(this, 'P', p),
			secondary:
				null !== (_b = null === source || void 0 === source ? void 0 : source.secondary) &&
					void 0 !== _b
					? _b
					: getPrimaryTonal(this, 'S', p),
			tertiary:
				null !== (_c = null === source || void 0 === source ? void 0 : source.tertiary) && void 0 !== _c
					? _c
					: getPrimaryTonal(this, 'T', p),
			neutral:
				null !== (_d = null === source || void 0 === source ? void 0 : source.neutral) && void 0 !== _d
					? _d
					: getPrimaryTonal(this, 'N', p),
			neutralVariant:
				null !== (_e = null === source || void 0 === source ? void 0 : source.neutralVariant) &&
					void 0 !== _e
					? _e
					: getPrimaryTonal(this, 'NV', p),
			error:
				null !== (_f = null === source || void 0 === source ? void 0 : source.error) && void 0 !== _f
					? _f
					: getPrimaryTonal(this, 'E', p)
		});
	}

	get customColors(): any[]{
		let _a: ThemeAdapterProps['overrides'], _b: ThemeAdapterBase;
		return [
			...(null !==
				(_b = null === (_a = this.props.overrides) || void 0 === _a ? void 0 : _a.customColors) &&
				void 0 !== _b
				? _b
				: [])
		];
	}

	save() {
		const theme = {
			seed: this.seedValue,
			baseline: this.props.isBaseline,
			imageUrl: this.imageUrl,
			customColors: this.customColors,
			light: this.light,
			dark: this.dark,
			androidLight: flags.enableAndroid ? this.androidLight : void 0,
			androidDark: flags.enableAndroid ? this.androidDark : void 0,
			primary: this.primaryGroup,
			secondary: this.secondaryGroup,
			tertiary: this.tertiaryGroup,
			neutral: this.neutralGroup,
			neutralVariant: this.neutralVariantGroup,
			error: this.errorGroup,
			styles: this.styles,
			source: this.source
		} as Theme;
		console.debug('saved theme', theme);
		return theme;
	}
}
