class Bn {
}
const An = {};
class Tn extends Bn {
  constructor(t) {
    if (super(), An !== An)
      throw Error("Bad secret");
    this.privateDoNotAccessOrElseWrappedUrl = t;
  }
  toString() {
    return this.privateDoNotAccessOrElseWrappedUrl;
  }
}
function zn(e) {
  const t = e.type.match(/^([^;]+)(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i);
  if ((t == null ? void 0 : t.length) !== 2 || !(/^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)$/i.test(t[1]) || /^video\/(?:mpeg|mp4|ogg|webm|x-matroska|quicktime|x-ms-wmv)$/i.test(t[1]) || /^audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)$/i.test(t[1])))
    throw Error(`unsafe blob MIME type: ${e.type}`);
  return new Tn(URL.createObjectURL(e));
}
function Gn(e) {
  let t;
  if (e instanceof Bn)
    if (e instanceof Tn)
      t = e.privateDoNotAccessOrElseWrappedUrl;
    else
      throw Error("Unexpected type when unwrapping SafeUrl");
  else
    t = unwrap(e);
  return t;
}
class Ln {
  constructor(t, o) {
    this.cutLocation = t, this.maximum = o;
  }
}
function _(e, t, o) {
  return (e << 10) + (e << 6) + e + (t << 5) + t + o;
}
class $n {
  constructor() {
    this.weights = [], this.moments = [], this.momentsR = [], this.momentsG = [], this.momentsB = [], this.cubes = [];
  }
  volume(t, o) {
    return o[_(t.r1, t.g1, t.b1)] - o[_(t.r1, t.g1, t.b0)] - o[_(t.r1, t.g0, t.b1)] + o[_(t.r1, t.g0, t.b0)] - o[_(t.r0, t.g1, t.b1)] + o[_(t.r0, t.g1, t.b0)] + o[_(t.r0, t.g0, t.b1)] - o[_(t.r0, t.g0, t.b0)];
  }
  bottom(t, o, i) {
    switch (o) {
      case "red":
        return -i[_(t.r0, t.g1, t.b1)] + i[_(t.r0, t.g1, t.b0)] + i[_(t.r0, t.g0, t.b1)] - i[_(t.r0, t.g0, t.b0)];
      case "green":
        return -i[_(t.r1, t.g0, t.b1)] + i[_(t.r1, t.g0, t.b0)] + i[_(t.r0, t.g0, t.b1)] - i[_(t.r0, t.g0, t.b0)];
      case "blue":
        return -i[_(t.r1, t.g1, t.b0)] + i[_(t.r1, t.g0, t.b0)] + i[_(t.r0, t.g1, t.b0)] - i[_(t.r0, t.g0, t.b0)];
      default:
        throw Error("unexpected direction $direction");
    }
  }
  top(t, o, i, n) {
    switch (o) {
      case "red":
        return n[_(i, t.g1, t.b1)] - n[_(i, t.g1, t.b0)] - n[_(i, t.g0, t.b1)] + n[_(i, t.g0, t.b0)];
      case "green":
        return n[_(t.r1, i, t.b1)] - n[_(t.r1, i, t.b0)] - n[_(t.r0, i, t.b1)] + n[_(t.r0, i, t.b0)];
      case "blue":
        return n[_(t.r1, t.g1, i)] - n[_(t.r1, t.g0, i)] - n[_(t.r0, t.g1, i)] + n[_(t.r0, t.g0, i)];
      default:
        throw Error("unexpected direction $direction");
    }
  }
}
class On {
  constructor() {
    this.r0 = 0, this.vol = this.b1 = this.b0 = this.g1 = this.g0 = this.r1 = this.r0;
  }
}
class Un {
  constructor(t) {
    this.resultCount = t;
  }
}
class jn {
  constructor() {
    this.distance = -1, this.index = this.distance;
  }
}
function qn(e) {
  e.cubes = Array.from({
    length: 256
  }).fill(0).map(() => new On());
  const t = Array.from({
    length: 256
  }).fill(0);
  e.cubes[0].r0 = 0, e.cubes[0].g0 = 0, e.cubes[0].b0 = 0, e.cubes[0].r1 = 32, e.cubes[0].g1 = 32, e.cubes[0].b1 = 32;
  let o = 256, i = 0;
  for (let n = 1; 256 > n; n++) {
    Wn(e, e.cubes[i], e.cubes[n]) ? (t[i] = 1 < e.cubes[i].vol ? wn(e, e.cubes[i]) : 0, t[n] = 1 < e.cubes[n].vol ? wn(e, e.cubes[n]) : 0) : (t[i] = 0, n--), i = 0;
    let l = t[0];
    for (let r = 1; r <= n; r++)
      t[r] > l && (l = t[r], i = r);
    if (0 >= l) {
      o = n + 1;
      break;
    }
  }
  return new Un(o);
}
function un(e, t) {
  return Math.min(Math.max(t, 0), e);
}
function cn(e) {
  return 0 > e ? e % 360 + 360 : 360 <= e ? e % 360 : e;
}
function En(e) {
  return 31308e-7 >= e ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - 0.055;
}
function U(e) {
  return 0.04045 >= e ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
}
function hn(e) {
  return 0 > e ? -1 : e === 0 ? 0 : 1;
}
function wn(e, t) {
  const o = e.volume(t, e.momentsR), i = e.volume(t, e.momentsG), n = e.volume(t, e.momentsB), l = e.moments[_(t.r1, t.g1, t.b1)] - e.moments[_(t.r1, t.g1, t.b0)] - e.moments[_(t.r1, t.g0, t.b1)] + e.moments[_(t.r1, t.g0, t.b0)] - e.moments[_(t.r0, t.g1, t.b1)] + e.moments[_(t.r0, t.g1, t.b0)] + e.moments[_(t.r0, t.g0, t.b1)] - e.moments[_(t.r0, t.g0, t.b0)], r = o * o + i * i + n * n, a = e.volume(t, e.weights);
  return l - r / a;
}
function Wn(e, t, o) {
  const i = e.volume(t, e.momentsR), n = e.volume(t, e.momentsG), l = e.volume(t, e.momentsB), r = e.volume(t, e.weights), a = _n(e, t, "red", t.r0 + 1, t.r1, i, n, l, r), c = _n(e, t, "green", t.g0 + 1, t.g1, i, n, l, r), y = _n(e, t, "blue", t.b0 + 1, t.b1, i, n, l, r);
  let g;
  const v = a.maximum, p = c.maximum, h = y.maximum;
  if (v >= p && v >= h) {
    if (0 > a.cutLocation)
      return !1;
    g = "red";
  } else
    g = p >= v && p >= h ? "green" : "blue";
  switch (o.r1 = t.r1, o.g1 = t.g1, o.b1 = t.b1, g) {
    case "red":
      t.r1 = a.cutLocation, o.r0 = t.r1, o.g0 = t.g0, o.b0 = t.b0;
      break;
    case "green":
      t.g1 = c.cutLocation, o.r0 = t.r0, o.g0 = t.g1, o.b0 = t.b0;
      break;
    case "blue":
      t.b1 = y.cutLocation, o.r0 = t.r0, o.g0 = t.g0, o.b0 = t.b1;
      break;
    default:
      throw Error("unexpected direction " + g);
  }
  return t.vol = (t.r1 - t.r0) * (t.g1 - t.g0) * (t.b1 - t.b0), o.vol = (o.r1 - o.r0) * (o.g1 - o.g0) * (o.b1 - o.b0), !0;
}
function Jn(e) {
  let t = 0;
  for (const v of e.values())
    t += v;
  const o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), n = Array(360).fill(0);
  for (const [v, p] of e.entries()) {
    const h = v, C = p / t, s = Cn(h);
    o.set(h, C), i.set(h, s), n[Math.round(s.hue)] += C;
  }
  const l = /* @__PURE__ */ new Map();
  for (const [v, p] of i.entries()) {
    const h = v, C = Math.round(p.hue);
    let s = 0;
    for (let S = C - 15; S < C + 15; S++)
      s += n[cn(S)];
    l.set(h, s);
  }
  const r = /* @__PURE__ */ new Map();
  for (const [v, p] of i.entries()) {
    const h = v, C = p, s = 70 * l.get(h);
    r.set(h, s + (C.chroma - 48) * (48 > C.chroma ? 0.1 : 0.3));
  }
  const a = Xn(l, i), c = /* @__PURE__ */ new Map();
  for (const v of a) {
    let p = !1;
    const h = i.get(v).hue;
    for (const [C] of c) {
      const s = i.get(C).hue;
      if (15 > 180 - Math.abs(Math.abs(h - s) - 180)) {
        p = !0;
        break;
      }
    }
    p || c.set(v, r.get(v));
  }
  const y = Array.from(c.entries());
  y.sort((v, p) => p[1] - v[1]);
  const g = y.map((v) => v[0]);
  return g.length === 0 && g.push(4282549748), g;
}
function Xn(e, t) {
  const o = [];
  for (const [i, n] of t.entries()) {
    const l = i, r = n, a = e.get(l);
    15 <= r.chroma && 10 <= Sn(l) && 0.01 <= a && o.push(l);
  }
  return o;
}
function _n(e, t, o, i, n, l, r, a, c) {
  const y = e.bottom(t, o, e.momentsR), g = e.bottom(t, o, e.momentsG), v = e.bottom(t, o, e.momentsB), p = e.bottom(t, o, e.weights);
  let h = 0, C = -1, s, S, w, E;
  for (let A = i; A < n; A++) {
    if (s = y + e.top(t, o, A, e.momentsR), S = g + e.top(t, o, A, e.momentsG), w = v + e.top(t, o, A, e.momentsB), E = p + e.top(t, o, A, e.weights), E === 0)
      continue;
    let M = s * s + S * S + w * w, b = 1 * E, T = M / b;
    s = l - s, S = r - S, w = a - w, E = c - E, E !== 0 && (M = s * s + S * S + w * w, b = 1 * E, T += M / b, T > h && (h = T, C = A));
  }
  return new Ln(C, h);
}
const sn = [95.047, 100, 108.883];
class Qn {
  constructor(t, o, i, n, l, r, a, c, y, g) {
    this.n = t, this.aw = o, this.nbb = i, this.ncb = n, this.c = l, this.nc = r, this.rgbD = a, this.fl = c, this.fLRoot = y, this.z = g;
  }
}
function Kn(e = sn, t = 200 / Math.PI * 100 * Math.pow(66 / 116, 3) / 100, o = 50, i = 2, n = !1) {
  const l = 0.401288 * e[0] + 0.650173 * e[1] + -0.051461 * e[2], r = -0.250268 * e[0] + 1.204414 * e[1] + 0.045854 * e[2], a = -2079e-6 * e[0] + 0.048952 * e[1] + 0.953127 * e[2], c = 0.8 + i / 10;
  let y;
  if (0.9 <= c) {
    const M = 10 * (c - 0.9);
    y = 0.59 * (1 - M) + 0.69 * M;
  } else {
    const M = 10 * (c - 0.8);
    y = 0.525 * (1 - M) + 0.59 * M;
  }
  let g = n ? 1 : c * (1 - 1 / 3.6 * Math.exp((-t - 42) / 92));
  g = 1 < g ? 1 : 0 > g ? 0 : g;
  const v = [100 / l * g + 1 - g, 100 / r * g + 1 - g, 100 / a * g + 1 - g], p = 1 / (5 * t + 1), h = p * p * p * p, C = 1 - h, s = h * t + 0.1 * C * C * Math.cbrt(5 * t), S = (8 < o ? 100 * Math.pow((o + 16) / 116, 3) : o / (24389 / 27) * 100) / e[1], w = 0.725 / Math.pow(S, 0.2), E = [
    Math.pow(s * v[0] * l / 100, 0.42),
    Math.pow(s * v[1] * r / 100, 0.42),
    Math.pow(s * v[2] * a / 100, 0.42)
  ], A = [
    400 * E[0] / (E[0] + 27.13),
    400 * E[1] / (E[1] + 27.13),
    400 * E[2] / (E[2] + 27.13)
  ];
  return new Qn(S, (2 * A[0] + A[1] + 0.05 * A[2]) * w, w, w, y, c, v, s, Math.pow(s, 0.25), 1.48 + Math.sqrt(S));
}
const N = Kn();
class Dn {
  constructor(t, o, i, n, l, r, a, c) {
    this.hue = t, this.chroma = o, this.j = i, this.q = n, this.s = l, this.jstar = r, this.astar = a, this.bstar = c;
  }
  distance(t) {
    const o = this.jstar - t.jstar, i = this.astar - t.astar, n = this.bstar - t.bstar;
    return 1.41 * Math.pow(Math.sqrt(o * o + i * i + n * n), 0.63);
  }
}
const yn = {
  light: {
    background: "#FFFFFF",
    surface: "#FFFFFF"
  },
  dark: {},
  neutral: {
    luminance100: "#FFFFFF",
    luminance99: "#FDFCFB",
    luminance98: "#FAF9F9",
    luminance95: "#F2F2F2",
    luminance90: "#E3E3E3",
    luminance80: "#C7C7C7",
    luminance70: "#ABABAB",
    luminance60: "#8F8F8F",
    luminance50: "#757575",
    luminance40: "#5E5E5E",
    luminance35: "#525252",
    luminance30: "#474747",
    luminance25: "#3A3C3C",
    luminance20: "#303030",
    luminance10: "#1F1F1F",
    luminance0: "#000000"
  },
  neutralVariant: {
    luminance100: "#FFFFFF",
    luminance99: "#FAFDFB",
    luminance98: "#F8FAF8",
    luminance95: "#EFF2EF",
    luminance90: "#E1E3E1",
    luminance80: "#C4C7C5",
    luminance70: "#A9ACAA",
    luminance60: "#8E918F",
    luminance50: "#747775",
    luminance40: "#5C5F5E",
    luminance35: "#4F5351",
    luminance30: "#444746",
    luminance25: "#393C3B",
    luminance20: "#2D312F",
    luminance10: "#191D1C",
    luminance0: "#000000"
  },
  primary: {
    luminance100: "#FFFFFF",
    luminance99: "#FAFBFF",
    luminance98: "#F8F9FF",
    luminance95: "#ECF3FE",
    luminance90: "#D3E3FD",
    luminance80: "#A8C7FA",
    luminance70: "#7CACF8",
    luminance60: "#4C8DF6",
    luminance50: "#1B6EF3",
    luminance40: "#0B57D0",
    luminance35: "#155298",
    luminance30: "#0842A0",
    luminance25: "#003B77",
    luminance20: "#062E6F",
    luminance10: "#041E49",
    luminance0: "#000000"
  },
  secondary: {
    luminance100: "#FFFFFF",
    luminance99: "#F7FCFF",
    luminance98: "#E3FFF6",
    luminance95: "#DFF3FF",
    luminance90: "#C2E7FF",
    luminance80: "#7FCFFF",
    luminance70: "#5AB3F0",
    luminance60: "#3998D3",
    luminance50: "#047DB7",
    luminance40: "#00639B",
    luminance35: "#005E4E",
    luminance30: "#004A77",
    luminance25: "#004438",
    luminance20: "#003355",
    luminance10: "#001D35",
    luminance0: "#000000"
  },
  tertiary: {
    luminance100: "#FFFFFF",
    luminance99: "#F2FFEE",
    luminance98: "#E8FFE7",
    luminance95: "#E7F8ED",
    luminance90: "#C4EED0",
    luminance80: "#6DD58C",
    luminance70: "#37BE5F",
    luminance60: "#1EA446",
    luminance50: "#198639",
    luminance40: "#146C2E",
    luminance35: "#006024",
    luminance30: "#0F5223",
    luminance25: "#004618",
    luminance20: "#0A3818",
    luminance10: "#072711",
    luminance0: "#000000"
  },
  error: {
    luminance100: "#FFFFFF",
    luminance99: "#FFFBF9",
    luminance98: "#FFF8F6",
    luminance95: "#FCEEEE",
    luminance90: "#F9DEDC",
    luminance80: "#F2B8B5",
    luminance70: "#EC928E",
    luminance60: "#E46962",
    luminance50: "#DC362E",
    luminance40: "#B3261E",
    luminance35: "#833D3B",
    luminance30: "#8C1D18",
    luminance25: "#662726",
    luminance20: "#601410",
    luminance10: "#410E0B",
    luminance0: "#000000"
  },
  styles: {
    display1: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 64,
      lineHeight: 76,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    display2: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    display3: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 45,
      lineHeight: 52,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline1: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline2: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline3: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline4: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline5: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline6: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    subhead1: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Medium",
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    subhead2: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Medium",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    button: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Medium",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    body1: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    body2: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    caption: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Regular",
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.1,
      paragraphSpacing: 0
    },
    overline: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Medium",
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.1,
      paragraphSpacing: 0
    },
    labelSmall: {
      fontFamilyName: "Google Sans Text",
      fontFamilyStyle: "Medium",
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.1,
      paragraphSpacing: 0
    }
  }
}, fn = {
  light: {},
  dark: {},
  neutral: {
    luminance100: "#FFFFFF",
    luminance99: "#FFFBFE",
    luminance98: "#FDF8FC",
    luminance95: "#F4EFF4",
    luminance90: "#E6E1E5",
    luminance80: "#C9C5CA",
    luminance70: "#AEAAAE",
    luminance60: "#939094",
    luminance50: "#787579",
    luminance40: "#605D62",
    luminance35: "#545255",
    luminance30: "#484649",
    luminance25: "#3D3B3E",
    luminance20: "#313033",
    luminance10: "#1C1B1F",
    luminance0: "#000000"
  },
  neutralVariant: {
    luminance100: "#FFFFFF",
    luminance99: "#FFFBFE",
    luminance98: "#FEF7FF",
    luminance95: "#F5EEFA",
    luminance90: "#E7E0EC",
    luminance80: "#CAC4D0",
    luminance70: "#AEA9B4",
    luminance60: "#938F99",
    luminance50: "#79747E",
    luminance40: "#605D66",
    luminance35: "#54515A",
    luminance30: "#49454F",
    luminance25: "#3D3A43",
    luminance20: "#322F37",
    luminance10: "#1D1A22",
    luminance0: "#000000"
  },
  primary: {
    luminance100: "#FFFFFF",
    luminance99: "#FFFBFE",
    luminance98: "#FEF7FF",
    luminance95: "#F6EDFF",
    luminance90: "#EADDFF",
    luminance80: "#D0BCFF",
    luminance70: "#B69DF8",
    luminance60: "#9A82DB",
    luminance50: "#7F67BE",
    luminance40: "#6750A4",
    luminance35: "#5B4497",
    luminance30: "#4F378B",
    luminance25: "#432B7E",
    luminance20: "#381E72",
    luminance10: "#21005D",
    luminance0: "#000000"
  },
  secondary: {
    luminance100: "#FFFFFF",
    luminance99: "#FFFBFE",
    luminance98: "#FEF7FF",
    luminance95: "#F6EDFF",
    luminance90: "#E8DEF8",
    luminance80: "#CCC2DC",
    luminance70: "#B0A7C0",
    luminance60: "#958DA5",
    luminance50: "#7A7289",
    luminance40: "#625B71",
    luminance35: "#564F65",
    luminance30: "#4A4458",
    luminance25: "#3E384D",
    luminance20: "#332D41",
    luminance10: "#1D192B",
    luminance0: "#000000"
  },
  tertiary: {
    luminance100: "#FFFFFF",
    luminance99: "#FFFBFA",
    luminance98: "#FFF8F9",
    luminance95: "#FFECF1",
    luminance90: "#FFD8E4",
    luminance80: "#EFB8C8",
    luminance70: "#D29DAC",
    luminance60: "#B58392",
    luminance50: "#986977",
    luminance40: "#7D5260",
    luminance35: "#704653",
    luminance30: "#633B48",
    luminance25: "#57303D",
    luminance20: "#492532",
    luminance10: "#31111D",
    luminance0: "#000000"
  },
  error: {
    luminance100: "#FFFFFF",
    luminance99: "#FFFBF9",
    luminance98: "#FFF8F6",
    luminance95: "#FCEEEE",
    luminance90: "#F9DEDC",
    luminance80: "#F2B8B5",
    luminance70: "#EC928E",
    luminance60: "#E46962",
    luminance50: "#DC362E",
    luminance40: "#B3261E",
    luminance35: "#833D3B",
    luminance30: "#8C1D18",
    luminance25: "#662726",
    luminance20: "#601410",
    luminance10: "#410E0B",
    luminance0: "#000000"
  },
  styles: {
    display1: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 64,
      lineHeight: 76,
      letterSpacing: -0.5,
      paragraphSpacing: 0
    },
    display2: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: -0.25,
      paragraphSpacing: 0
    },
    display3: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 45,
      lineHeight: 52,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline1: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline2: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline3: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline4: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline5: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    headline6: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0,
      paragraphSpacing: 0
    },
    subhead1: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Medium",
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.1,
      paragraphSpacing: 0
    },
    subhead2: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Medium",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      paragraphSpacing: 0
    },
    button: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Medium",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      paragraphSpacing: 0
    },
    body1: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
      paragraphSpacing: 0
    },
    body2: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      paragraphSpacing: 0
    },
    caption: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Regular",
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      paragraphSpacing: 0
    },
    overline: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Medium",
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
      paragraphSpacing: 0
    },
    labelSmall: {
      fontFamilyName: "Roboto",
      fontFamilyStyle: "Medium",
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.5,
      paragraphSpacing: 0
    }
  }
};
class Rn {
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
const O = Rn;
O.enableDsp;
O.enableAndroid;
O.enableWebExport;
O.enableColorShift;
function $(e, t) {
  return (e == null ? void 0 : e.toUpperCase()) === (t == null ? void 0 : t.toUpperCase());
}
function Yn(e) {
  let t, o;
  return ((o = (t = e == null ? void 0 : e.styles) === null || t === void 0 ? void 0 : t.headline1) === null || o === void 0 ? void 0 : o.fontFamilyName) === "Roboto";
}
function Zn(e) {
  let t = !0;
  const o = Yn(e) ? fn : yn;
  function i(n, l, r) {
    if (t) {
      let a;
      (a = $(l.luminance0, r.luminance0)) && (a = $(l.luminance10, r.luminance10)), a && (a = $(l.luminance20, r.luminance20)), a && (a = $(l.luminance30, r.luminance30)), a && (a = $(l.luminance40, r.luminance40)), a && (a = $(l.luminance50, r.luminance50)), a && (a = $(l.luminance60, r.luminance60)), a && (a = $(l.luminance70, r.luminance70)), a && (a = $(l.luminance80, r.luminance80)), a && (a = $(l.luminance90, r.luminance90)), a && (a = $(l.luminance95, r.luminance95)), a && (a = $(l.luminance98, r.luminance98)), a && (a = $(l.luminance100, r.luminance100)), t = a;
    }
    t || console.debug(`theme adapter ${n} group mismatch`, l, r);
  }
  return i("primary", e.primary, o.primary), i("secondary", e.secondary, o.secondary), i("tertiary", e.tertiary, o.tertiary), i("neutral", e.neutral, o.neutral), i("neutralVariant", e.neutralVariant, o.neutralVariant), i("error", e.error, o.error), console.debug(`theme adapter baseline match: ${t}`), t;
}
function dn(e, t, o) {
  return (o ?? e.palettes).get(`${t}-40`);
}
function d(e) {
  try {
    return In(e);
  } catch (t) {
    return console.debug(`error converting [${e}] to hex`, t), "#000000";
  }
}
function nt(e) {
  return {
    luminance100: d(e.tone(100)),
    luminance99: d(e.tone(99)),
    luminance98: d(e.tone(98)),
    luminance95: d(e.tone(95)),
    luminance90: d(e.tone(90)),
    luminance80: d(e.tone(80)),
    luminance70: d(e.tone(70)),
    luminance60: d(e.tone(60)),
    luminance50: d(e.tone(50)),
    luminance40: d(e.tone(40)),
    luminance35: d(e.tone(35)),
    luminance30: d(e.tone(30)),
    luminance25: d(e.tone(25)),
    luminance20: d(e.tone(20)),
    luminance10: d(e.tone(10)),
    luminance0: d(e.tone(0))
  };
}
function mn(e, t, o) {
  let i;
  const n = (i = e.props.overrides.tonalGroups) !== null && i !== void 0 ? i : {}, l = Object(n)[t];
  return Rn.is1p && !e.props.isBaseline || !l ? nt(o) : l;
}
function gn(e, t) {
  const o = /* @__PURE__ */ new Map();
  return o.set(`${e}-100`, t.luminance100), o.set(`${e}-99`, t.luminance99), o.set(`${e}-98`, t.luminance98), o.set(`${e}-95`, t.luminance95), o.set(`${e}-90`, t.luminance90), o.set(`${e}-80`, t.luminance80), o.set(`${e}-70`, t.luminance70), o.set(`${e}-60`, t.luminance60), o.set(`${e}-50`, t.luminance50), o.set(`${e}-40`, t.luminance40), o.set(`${e}-35`, t.luminance35), o.set(`${e}-30`, t.luminance30), o.set(`${e}-25`, t.luminance25), o.set(`${e}-20`, t.luminance20), o.set(`${e}-10`, t.luminance10), o.set(`${e}-0`, t.luminance0), o;
}
class tt {
  constructor(t) {
    this.props = t;
  }
  get isBaseline() {
    return Zn(this.save());
  }
  get is3p() {
    return this.props.is3p;
  }
  get styles() {
    return this.props.is3p ? fn.styles : yn.styles;
  }
  get imageUrl() {
    return this.props.imageUrl;
  }
  get light() {
    let t, o, i;
    const n = this.props.isBaseline ? (t = O.is1p ? yn : fn) === null || t === void 0 ? void 0 : t.light : (i = (o = this.props.overrides) === null || o === void 0 ? void 0 : o.light) !== null && i !== void 0 ? i : {}, l = this.palettes;
    let r = "", a, c, y, g, v, p, h, C, s, S, w, E, A, M, b, T, P, u, f, x, D, R, m, F, B, k;
    return {
      primary: (r = n == null ? void 0 : n.primary) !== null && r !== void 0 ? r : l.get("P-40"),
      onPrimary: (a = n == null ? void 0 : n.onPrimary) !== null && a !== void 0 ? a : l.get("P-100"),
      primaryContainer: (c = n == null ? void 0 : n.primaryContainer) !== null && c !== void 0 ? c : l.get("P-90"),
      onPrimaryContainer: (y = n == null ? void 0 : n.onPrimaryContainer) !== null && y !== void 0 ? y : l.get("P-10"),
      secondary: (g = n == null ? void 0 : n.secondary) !== null && g !== void 0 ? g : l.get("S-40"),
      onSecondary: (v = n == null ? void 0 : n.onSecondary) !== null && v !== void 0 ? v : l.get("S-100"),
      secondaryContainer: (p = n == null ? void 0 : n.secondaryContainer) !== null && p !== void 0 ? p : l.get("S-90"),
      onSecondaryContainer: (h = n == null ? void 0 : n.onSecondaryContainer) !== null && h !== void 0 ? h : l.get("S-10"),
      tertiary: (C = n == null ? void 0 : n.tertiary) !== null && C !== void 0 ? C : l.get("T-40"),
      onTertiary: (s = n == null ? void 0 : n.onTertiary) !== null && s !== void 0 ? s : l.get("T-100"),
      tertiaryContainer: (S = n == null ? void 0 : n.tertiaryContainer) !== null && S !== void 0 ? S : l.get("T-90"),
      onTertiaryContainer: (w = n == null ? void 0 : n.onTertiaryContainer) !== null && w !== void 0 ? w : l.get("T-10"),
      error: (E = n == null ? void 0 : n.error) !== null && E !== void 0 ? E : l.get("E-40"),
      errorContainer: (A = n == null ? void 0 : n.errorContainer) !== null && A !== void 0 ? A : l.get("E-90"),
      onError: (M = n == null ? void 0 : n.onError) !== null && M !== void 0 ? M : l.get("E-100"),
      onErrorContainer: (b = n == null ? void 0 : n.onErrorContainer) !== null && b !== void 0 ? b : l.get("E-10"),
      background: (T = n == null ? void 0 : n.background) !== null && T !== void 0 ? T : l.get("N-99"),
      onBackground: (P = n == null ? void 0 : n.onBackground) !== null && P !== void 0 ? P : l.get("N-10"),
      surface: (u = n == null ? void 0 : n.surface) !== null && u !== void 0 ? u : l.get("N-99"),
      onSurface: (f = n == null ? void 0 : n.onSurface) !== null && f !== void 0 ? f : l.get("N-10"),
      surfaceVariant: (x = n == null ? void 0 : n.surfaceVariant) !== null && x !== void 0 ? x : l.get("NV-90"),
      onSurfaceVariant: (D = n == null ? void 0 : n.onSurfaceVariant) !== null && D !== void 0 ? D : l.get("NV-30"),
      outline: (R = n == null ? void 0 : n.outline) !== null && R !== void 0 ? R : l.get("NV-50"),
      inverseOnSurface: (m = n == null ? void 0 : n.inverseOnSurface) !== null && m !== void 0 ? m : l.get("N-95"),
      inverseSurface: (F = n == null ? void 0 : n.inverseSurface) !== null && F !== void 0 ? F : l.get("N-20"),
      inversePrimary: (B = n == null ? void 0 : n.inversePrimary) !== null && B !== void 0 ? B : l.get("P-80"),
      shadow: (k = n == null ? void 0 : n.shadow) !== null && k !== void 0 ? k : l.get("N-0")
    };
  }
  get dark() {
    let t, o, i;
    const n = this.props.isBaseline ? (t = O.is1p ? yn : fn) === null || t === void 0 ? void 0 : t.dark : (i = (o = this.props.overrides) === null || o === void 0 ? void 0 : o.dark) !== null && i !== void 0 ? i : {}, l = this.palettes;
    let r, a, c, y, g, v, p, h, C, s, S, w, E, A, M, b, T, P, u, f, x, D, R, m, F, B, k;
    return {
      primary: (r = n == null ? void 0 : n.primary) !== null && r !== void 0 ? r : l.get("P-80"),
      onPrimary: (a = n == null ? void 0 : n.onPrimary) !== null && a !== void 0 ? a : l.get("P-20"),
      primaryContainer: (c = n == null ? void 0 : n.primaryContainer) !== null && c !== void 0 ? c : l.get("P-30"),
      onPrimaryContainer: (y = n == null ? void 0 : n.onPrimaryContainer) !== null && y !== void 0 ? y : l.get("P-90"),
      secondary: (g = n == null ? void 0 : n.secondary) !== null && g !== void 0 ? g : l.get("S-80"),
      onSecondary: (v = n == null ? void 0 : n.onSecondary) !== null && v !== void 0 ? v : l.get("S-20"),
      secondaryContainer: (p = n == null ? void 0 : n.secondaryContainer) !== null && p !== void 0 ? p : l.get("S-30"),
      onSecondaryContainer: (h = n == null ? void 0 : n.onSecondaryContainer) !== null && h !== void 0 ? h : l.get("S-90"),
      tertiary: (C = n == null ? void 0 : n.tertiary) !== null && C !== void 0 ? C : l.get("T-80"),
      onTertiary: (s = n == null ? void 0 : n.onTertiary) !== null && s !== void 0 ? s : l.get("T-20"),
      tertiaryContainer: (S = n == null ? void 0 : n.tertiaryContainer) !== null && S !== void 0 ? S : l.get("T-30"),
      onTertiaryContainer: (w = n == null ? void 0 : n.onTertiaryContainer) !== null && w !== void 0 ? w : l.get("T-90"),
      error: (E = n == null ? void 0 : n.error) !== null && E !== void 0 ? E : l.get("E-80"),
      errorContainer: (A = n == null ? void 0 : n.errorContainer) !== null && A !== void 0 ? A : l.get("E-30"),
      onError: (M = n == null ? void 0 : n.onError) !== null && M !== void 0 ? M : l.get("E-20"),
      onErrorContainer: (b = n == null ? void 0 : n.onErrorContainer) !== null && b !== void 0 ? b : l.get("E-90"),
      background: (T = n == null ? void 0 : n.background) !== null && T !== void 0 ? T : l.get("N-10"),
      onBackground: (P = n == null ? void 0 : n.onBackground) !== null && P !== void 0 ? P : l.get("N-90"),
      surface: (u = n == null ? void 0 : n.surface) !== null && u !== void 0 ? u : l.get("N-10"),
      onSurface: (f = n == null ? void 0 : n.onSurface) !== null && f !== void 0 ? f : l.get("N-90"),
      surfaceVariant: (x = n == null ? void 0 : n.surfaceVariant) !== null && x !== void 0 ? x : l.get("NV-30"),
      onSurfaceVariant: (D = n == null ? void 0 : n.onSurfaceVariant) !== null && D !== void 0 ? D : l.get("NV-80"),
      outline: (R = n == null ? void 0 : n.outline) !== null && R !== void 0 ? R : l.get("NV-60"),
      inverseOnSurface: (m = n == null ? void 0 : n.inverseOnSurface) !== null && m !== void 0 ? m : l.get("N-10"),
      inverseSurface: (F = n == null ? void 0 : n.inverseSurface) !== null && F !== void 0 ? F : l.get("N-90"),
      inversePrimary: (B = n == null ? void 0 : n.inversePrimary) !== null && B !== void 0 ? B : l.get("P-40"),
      shadow: (k = n == null ? void 0 : n.shadow) !== null && k !== void 0 ? k : l.get("N-0")
    };
  }
  get androidLight() {
    let t, o = this.palettes, i = this.props.tones, n = (t = this.props.overrides) === null || t === void 0 ? void 0 : t.androidLight, l, r, a, c, y, g, v, p, h, C, s, S, w, E, A, M, b, T, P, u, f, x, D, R, m, F, B, k, z, G, H, I, V, L, j, q, W, J, X, Q, K, Y, Z, nn, tn, en, on, ln, an, rn;
    return {
      colorAccentPrimary: (r = (l = n == null ? void 0 : n.colorAccentPrimary) !== null && l !== void 0 ? l : o.get("P-90")) !== null && r !== void 0 ? r : d(i.a1.tone(90)),
      colorAccentPrimaryVariant: (c = (a = n == null ? void 0 : n.colorAccentPrimaryVariant) !== null && a !== void 0 ? a : o.get("P-40")) !== null && c !== void 0 ? c : d(i.a1.tone(40)),
      colorAccentSecondary: (g = (y = n == null ? void 0 : n.colorAccentSecondary) !== null && y !== void 0 ? y : o.get("S-90")) !== null && g !== void 0 ? g : d(i.a2.tone(90)),
      colorAccentSecondaryVariant: (p = (v = n == null ? void 0 : n.colorAccentSecondaryVariant) !== null && v !== void 0 ? v : o.get("S-40")) !== null && p !== void 0 ? p : d(i.a2.tone(40)),
      colorAccentTertiary: (C = (h = n == null ? void 0 : n.colorAccentTertiary) !== null && h !== void 0 ? h : o.get("T-90")) !== null && C !== void 0 ? C : d(i.a3.tone(90)),
      colorAccentTertiaryVariant: (S = (s = n == null ? void 0 : n.colorAccentTertiaryVariant) !== null && s !== void 0 ? s : o.get("T-40")) !== null && S !== void 0 ? S : d(i.a3.tone(40)),
      textColorPrimary: (E = (w = n == null ? void 0 : n.textColorPrimary) !== null && w !== void 0 ? w : o.get("N-10")) !== null && E !== void 0 ? E : d(i.n1.tone(10)),
      textColorSecondary: (M = (A = n == null ? void 0 : n.textColorSecondary) !== null && A !== void 0 ? A : o.get("NV-30")) !== null && M !== void 0 ? M : d(i.n2.tone(30)),
      textColorTertiary: (T = (b = n == null ? void 0 : n.textColorTertiary) !== null && b !== void 0 ? b : o.get("NV-50")) !== null && T !== void 0 ? T : d(i.n2.tone(50)),
      textColorPrimaryInverse: (u = (P = n == null ? void 0 : n.textColorPrimaryInverse) !== null && P !== void 0 ? P : o.get("N-95")) !== null && u !== void 0 ? u : d(i.n1.tone(95)),
      textColorSecondaryInverse: (x = (f = n == null ? void 0 : n.textColorSecondaryInverse) !== null && f !== void 0 ? f : o.get("N-80")) !== null && x !== void 0 ? x : d(i.n1.tone(80)),
      textColorTertiaryInverse: (R = (D = n == null ? void 0 : n.textColorTertiaryInverse) !== null && D !== void 0 ? D : o.get("N-60")) !== null && R !== void 0 ? R : d(i.n1.tone(60)),
      colorBackground: (F = (m = n == null ? void 0 : n.colorBackground) !== null && m !== void 0 ? m : o.get("N-95")) !== null && F !== void 0 ? F : d(i.n1.tone(95)),
      colorBackgroundFloating: (k = (B = n == null ? void 0 : n.colorBackgroundFloating) !== null && B !== void 0 ? B : o.get("N-98")) !== null && k !== void 0 ? k : d(i.n1.tone(98)),
      colorSurface: (G = (z = n == null ? void 0 : n.colorSurface) !== null && z !== void 0 ? z : o.get("N-98")) !== null && G !== void 0 ? G : d(i.n1.tone(98)),
      colorSurfaceVariant: (I = (H = n == null ? void 0 : n.colorSurfaceVariant) !== null && H !== void 0 ? H : o.get("N-90")) !== null && I !== void 0 ? I : d(i.n1.tone(90)),
      colorSurfaceHighlight: (L = (V = n == null ? void 0 : n.colorSurfaceHighlight) !== null && V !== void 0 ? V : o.get("N-100")) !== null && L !== void 0 ? L : d(i.n1.tone(100)),
      surfaceHeader: (q = (j = n == null ? void 0 : n.surfaceHeader) !== null && j !== void 0 ? j : o.get("N-90")) !== null && q !== void 0 ? q : d(i.n1.tone(90)),
      underSurface: (J = (W = n == null ? void 0 : n.underSurface) !== null && W !== void 0 ? W : o.get("N-0")) !== null && J !== void 0 ? J : d(i.n1.tone(0)),
      offState: (Q = (X = n == null ? void 0 : n.offState) !== null && X !== void 0 ? X : o.get("N-20")) !== null && Q !== void 0 ? Q : d(i.n1.tone(20)),
      accentSurface: (Y = (K = n == null ? void 0 : n.accentSurface) !== null && K !== void 0 ? K : o.get("NV-95")) !== null && Y !== void 0 ? Y : d(i.a2.tone(95)),
      textPrimaryOnAccent: (nn = (Z = n == null ? void 0 : n.textPrimaryOnAccent) !== null && Z !== void 0 ? Z : o.get("N-10")) !== null && nn !== void 0 ? nn : d(i.n1.tone(10)),
      textSecondaryOnAccent: (en = (tn = n == null ? void 0 : n.textSecondaryOnAccent) !== null && tn !== void 0 ? tn : o.get("NV-30")) !== null && en !== void 0 ? en : d(i.n2.tone(30)),
      volumeBackground: (ln = (on = n == null ? void 0 : n.volumeBackground) !== null && on !== void 0 ? on : o.get("N-25")) !== null && ln !== void 0 ? ln : d(i.n1.tone(25)),
      scrim: (rn = (an = n == null ? void 0 : n.scrim) !== null && an !== void 0 ? an : o.get("N-80")) !== null && rn !== void 0 ? rn : d(i.n1.tone(80))
    };
  }
  get androidDark() {
    var t, o = this.palettes, i = this.props.tones, n = (t = this.props.overrides) === null || t === void 0 ? void 0 : t.androidDark, l, r, a, c, y, g, v, p, h, C, s, S, w, E, A, M, b, T, P, u, f, x, D, R, m, F, B, k, z, G, H, I, V, L, j, q, W, J, X, Q, K, Y, Z, nn, tn, en, on, ln, an, rn;
    return {
      colorAccentPrimary: (r = (l = n == null ? void 0 : n.colorAccentPrimary) !== null && l !== void 0 ? l : o.get("P-90")) !== null && r !== void 0 ? r : d(i.a1.tone(90)),
      colorAccentPrimaryVariant: (c = (a = n == null ? void 0 : n.colorAccentPrimaryVariant) !== null && a !== void 0 ? a : o.get("P-70")) !== null && c !== void 0 ? c : d(i.a1.tone(70)),
      colorAccentSecondary: (g = (y = n == null ? void 0 : n.colorAccentSecondary) !== null && y !== void 0 ? y : o.get("S-90")) !== null && g !== void 0 ? g : d(i.a2.tone(90)),
      colorAccentSecondaryVariant: (p = (v = n == null ? void 0 : n.colorAccentSecondaryVariant) !== null && v !== void 0 ? v : o.get("S-70")) !== null && p !== void 0 ? p : d(i.a2.tone(70)),
      colorAccentTertiary: (C = (h = n == null ? void 0 : n.colorAccentTertiary) !== null && h !== void 0 ? h : o.get("T-90")) !== null && C !== void 0 ? C : d(i.a3.tone(90)),
      colorAccentTertiaryVariant: (S = (s = n == null ? void 0 : n.colorAccentTertiaryVariant) !== null && s !== void 0 ? s : o.get("T-70")) !== null && S !== void 0 ? S : d(i.a3.tone(70)),
      textColorPrimary: (E = (w = n == null ? void 0 : n.textColorPrimary) !== null && w !== void 0 ? w : o.get("N-95")) !== null && E !== void 0 ? E : d(i.n1.tone(95)),
      textColorSecondary: (M = (A = n == null ? void 0 : n.textColorSecondary) !== null && A !== void 0 ? A : o.get("NV-80")) !== null && M !== void 0 ? M : d(i.n2.tone(80)),
      textColorTertiary: (T = (b = n == null ? void 0 : n.textColorTertiary) !== null && b !== void 0 ? b : o.get("NV-60")) !== null && T !== void 0 ? T : d(i.n2.tone(60)),
      textColorPrimaryInverse: (u = (P = n == null ? void 0 : n.textColorPrimaryInverse) !== null && P !== void 0 ? P : o.get("N-10")) !== null && u !== void 0 ? u : d(i.n1.tone(10)),
      textColorSecondaryInverse: (x = (f = n == null ? void 0 : n.textColorSecondaryInverse) !== null && f !== void 0 ? f : o.get("N-30")) !== null && x !== void 0 ? x : d(i.n1.tone(30)),
      textColorTertiaryInverse: (R = (D = n == null ? void 0 : n.textColorTertiaryInverse) !== null && D !== void 0 ? D : o.get("N-50")) !== null && R !== void 0 ? R : d(i.n1.tone(50)),
      colorBackground: (F = (m = n == null ? void 0 : n.colorBackground) !== null && m !== void 0 ? m : o.get("N-10")) !== null && F !== void 0 ? F : d(i.n1.tone(10)),
      colorBackgroundFloating: (k = (B = n == null ? void 0 : n.colorBackgroundFloating) !== null && B !== void 0 ? B : o.get("N-10")) !== null && k !== void 0 ? k : d(i.n1.tone(10)),
      colorSurface: (G = (z = n == null ? void 0 : n.colorSurface) !== null && z !== void 0 ? z : o.get("N-20")) !== null && G !== void 0 ? G : d(i.n1.tone(20)),
      colorSurfaceVariant: (I = (H = n == null ? void 0 : n.colorSurfaceVariant) !== null && H !== void 0 ? H : o.get("N-30")) !== null && I !== void 0 ? I : d(i.n1.tone(30)),
      colorSurfaceHighlight: (L = (V = n == null ? void 0 : n.colorSurfaceHighlight) !== null && V !== void 0 ? V : o.get("N-35")) !== null && L !== void 0 ? L : d(i.n1.tone(35)),
      surfaceHeader: (q = (j = n == null ? void 0 : n.surfaceHeader) !== null && j !== void 0 ? j : o.get("N-30")) !== null && q !== void 0 ? q : d(i.n1.tone(30)),
      underSurface: (J = (W = n == null ? void 0 : n.underSurface) !== null && W !== void 0 ? W : o.get("N-0")) !== null && J !== void 0 ? J : d(i.n1.tone(0)),
      offState: (Q = (X = n == null ? void 0 : n.offState) !== null && X !== void 0 ? X : o.get("N-20")) !== null && Q !== void 0 ? Q : d(i.n1.tone(20)),
      accentSurface: (Y = (K = n == null ? void 0 : n.accentSurface) !== null && K !== void 0 ? K : o.get("NV-95")) !== null && Y !== void 0 ? Y : d(i.a2.tone(95)),
      textPrimaryOnAccent: (nn = (Z = n == null ? void 0 : n.textPrimaryOnAccent) !== null && Z !== void 0 ? Z : o.get("N-10")) !== null && nn !== void 0 ? nn : d(i.n1.tone(10)),
      textSecondaryOnAccent: (en = (tn = n == null ? void 0 : n.textSecondaryOnAccent) !== null && tn !== void 0 ? tn : o.get("NV-30")) !== null && en !== void 0 ? en : d(i.n2.tone(30)),
      volumeBackground: (ln = (on = n == null ? void 0 : n.volumeBackground) !== null && on !== void 0 ? on : o.get("N-25")) !== null && ln !== void 0 ? ln : d(i.n1.tone(25)),
      scrim: (rn = (an = n == null ? void 0 : n.scrim) !== null && an !== void 0 ? an : o.get("N-80")) !== null && rn !== void 0 ? rn : d(i.n1.tone(80))
    };
  }
  get tonalGroups() {
    return Object.assign({
      primary: this.primaryGroup,
      secondary: this.secondaryGroup,
      tertiary: this.tertiaryGroup,
      neutral: this.neutralGroup,
      neutralVariant: this.neutralVariantGroup,
      error: this.errorGroup
    }, this.props.overrides.tonalGroups);
  }
  get primaryGroup() {
    return mn(this, "primary", this.props.tones.a1);
  }
  get secondaryGroup() {
    return mn(this, "secondary", this.props.tones.a2);
  }
  get tertiaryGroup() {
    return mn(this, "tertiary", this.props.tones.a3);
  }
  get neutralGroup() {
    return mn(this, "neutral", this.props.tones.n1);
  }
  get neutralVariantGroup() {
    return mn(this, "neutralVariant", this.props.tones.n2);
  }
  get errorGroup() {
    return mn(this, "error", this.props.tones.error);
  }
  get primary() {
    return gn("P", this.primaryGroup);
  }
  get secondary() {
    return gn("S", this.secondaryGroup);
  }
  get tertiary() {
    return gn("T", this.tertiaryGroup);
  }
  get neutral() {
    return gn("N", this.neutralGroup);
  }
  get neutralVariant() {
    return gn("NV", this.neutralVariantGroup);
  }
  get error() {
    return gn("E", this.errorGroup);
  }
  get palettes() {
    let t = [];
    return t = t.concat(Array.from(this.primary.entries())), t = t.concat(Array.from(this.secondary.entries())), t = t.concat(Array.from(this.tertiary.entries())), t = t.concat(Array.from(this.neutral.entries())), t = t.concat(Array.from(this.neutralVariant.entries())), t = t.concat(Array.from(this.error.entries())), new Map(t);
  }
  get seedValue() {
    return this.props.seed;
  }
  get source() {
    let t, o, i, n, l, r;
    const a = this.palettes, c = this.props.overrides.source;
    return Object.assign(Object.assign({}, c), {
      seed: this.seedValue,
      imageUrl: this.imageUrl,
      primary: (t = c == null ? void 0 : c.primary) !== null && t !== void 0 ? t : dn(this, "P", a),
      secondary: (o = c == null ? void 0 : c.secondary) !== null && o !== void 0 ? o : dn(this, "S", a),
      tertiary: (i = c == null ? void 0 : c.tertiary) !== null && i !== void 0 ? i : dn(this, "T", a),
      neutral: (n = c == null ? void 0 : c.neutral) !== null && n !== void 0 ? n : dn(this, "N", a),
      neutralVariant: (l = c == null ? void 0 : c.neutralVariant) !== null && l !== void 0 ? l : dn(this, "NV", a),
      error: (r = c == null ? void 0 : c.error) !== null && r !== void 0 ? r : dn(this, "E", a)
    });
  }
  get customColors() {
    let t, o;
    return [
      ...(o = (t = this.props.overrides) === null || t === void 0 ? void 0 : t.customColors) !== null && o !== void 0 ? o : []
    ];
  }
  save() {
    const t = {
      seed: this.seedValue,
      baseline: this.props.isBaseline,
      imageUrl: this.imageUrl,
      customColors: this.customColors,
      light: this.light,
      dark: this.dark,
      androidLight: O.enableAndroid ? this.androidLight : void 0,
      androidDark: O.enableAndroid ? this.androidDark : void 0,
      primary: this.primaryGroup,
      secondary: this.secondaryGroup,
      tertiary: this.tertiaryGroup,
      neutral: this.neutralGroup,
      neutralVariant: this.neutralVariantGroup,
      error: this.errorGroup,
      styles: this.styles,
      source: this.source
    };
    return console.debug("saved theme", t), t;
  }
}
class et extends tt {
}
function Mn(e) {
  const t = Math.pow((e.chroma === 0 || e.j === 0 ? 0 : e.chroma / Math.sqrt(e.j / 100)) / Math.pow(1.64 - Math.pow(0.29, N.n), 0.73), 1.1111111111111112), o = e.hue * Math.PI / 180, i = N.aw * Math.pow(e.j / 100, 1 / N.c / N.z) / N.nbb, n = Math.sin(o), l = Math.cos(o), r = 23 * (i + 0.305) * t / (5e4 / 13 * (Math.cos(o + 2) + 3.8) * 5.75 * N.nc * N.ncb + 11 * t * l + 108 * t * n), a = r * l, c = r * n, y = (460 * i + 451 * a + 288 * c) / 1403, g = (460 * i - 891 * a - 261 * c) / 1403, v = (460 * i - 220 * a - 6300 * c) / 1403, p = 100 / N.fl * hn(y) * Math.pow(Math.max(0, 27.13 * Math.abs(y) / (400 - Math.abs(y))), 1 / 0.42) / N.rgbD[0], h = 100 / N.fl * hn(g) * Math.pow(Math.max(0, 27.13 * Math.abs(g) / (400 - Math.abs(g))), 1 / 0.42) / N.rgbD[1], C = 100 / N.fl * hn(v) * Math.pow(Math.max(0, 27.13 * Math.abs(v) / (400 - Math.abs(v))), 1 / 0.42) / N.rgbD[2];
  return Vn(1.86206786 * p - 1.01125463 * h + 0.14918677 * C, 0.38752654 * p + 0.62144744 * h - 897398e-8 * C, -0.0158415 * p - 0.03412294 * h + 1.04996444 * C);
}
function Nn(e, t, o) {
  const i = o * Math.PI / 180, n = 1 / 0.0228 * Math.log(1 + 0.0228 * t * N.fLRoot);
  return new Dn(o, t, e, 4 / N.c * Math.sqrt(e / 100) * (N.aw + 4) * N.fLRoot, 50 * Math.sqrt(t / Math.sqrt(e / 100) * N.c / (N.aw + 4)), (1 + 100 * 7e-3) * e / (1 + 7e-3 * e), n * Math.cos(i), n * Math.sin(i));
}
function pn(e, t, o) {
  if (1 > t || 0 >= Math.round(o) || 100 <= Math.round(o))
    return bn(o);
  e = cn(e);
  let i = t, n = t, l = 0, r = !0, a = null;
  for (; 0.4 <= Math.abs(l - i); ) {
    const c = e, y = n, g = o;
    let v = 0, p = 100, h, C = 1e3, s = 1e3, S = null;
    for (; 0.01 < Math.abs(v - p); ) {
      h = v + (p - v) / 2;
      const E = Mn(Nn(h, y, c)), A = Sn(E), M = Math.abs(g - A);
      if (0.2 > M) {
        const b = Cn(E), T = b.distance(Nn(b.j, b.chroma, c));
        1 >= T && T <= s && (C = M, s = T, S = b);
      }
      if (C === 0 && s === 0)
        break;
      A < g ? v = h : p = h;
    }
    const w = S;
    if (r) {
      if (w != null)
        return Mn(w);
      r = !1;
    } else
      w === null ? i = n : (a = w, l = n);
    n = l + (i - l) / 2;
  }
  return a === null ? bn(o) : Mn(a);
}
function Fn(e, t) {
  const o = Cn(t), i = Sn(t);
  e.internalHue = o.hue, e.internalChroma = o.chroma, e.internalTone = i;
}
class kn {
  constructor(t, o, i) {
    this.internalHue = t, this.internalChroma = o, this.internalTone = i, Fn(this, this.toInt());
  }
  toInt() {
    return pn(cn(this.internalHue), this.internalChroma, un(100, this.internalTone));
  }
  get hue() {
    return this.internalHue;
  }
  set hue(t) {
    Fn(this, pn(cn(cn(t)), this.internalChroma, un(100, this.internalTone)));
  }
  get chroma() {
    return this.internalChroma;
  }
  set chroma(t) {
    Fn(this, pn(cn(this.internalHue), t, un(100, this.internalTone)));
  }
  get tone() {
    return this.internalTone;
  }
  set tone(t) {
    Fn(this, pn(cn(this.internalHue), this.internalChroma, un(100, t)));
  }
}
class vn {
  constructor(t, o) {
    this.hue = t, this.chroma = o, this.cache = /* @__PURE__ */ new Map();
  }
  tone(t) {
    let o = this.cache.get(t);
    return o === void 0 && (o = new kn(this.hue, this.chroma, t).toInt(), this.cache.set(t, o)), o;
  }
}
class ot {
  constructor(t) {
    const o = it(t), i = o.hue;
    this.a1 = new vn(i, Math.max(48, o.chroma)), this.a2 = new vn(i, 16), this.a3 = new vn(i + 60, 24), this.n1 = new vn(i, 4), this.n2 = new vn(i, 8), this.error = new vn(25, 84);
  }
}
function In(e) {
  const t = (e & 65280) >> 8, o = e & 255, i = [((e & 16711680) >> 16).toString(16), t.toString(16), o.toString(16)];
  for (const [n, l] of i.entries()) {
    const r = n, a = l;
    a.length === 1 && (i[r] = "0" + a);
  }
  return "#" + i.join("");
}
function it(e) {
  const t = Cn(e);
  return new kn(t.hue, t.chroma, Sn(e));
}
function lt(e) {
  e = e.replace("#", "");
  const t = e.length === 3, o = e.length === 6, i = e.length === 8;
  if (!t && !o && !i)
    throw Error("unexpected hex " + e);
  let n = 0, l = 0, r = 0;
  return t ? (n = parseInt(e.slice(0, 1).repeat(2), 16), l = parseInt(e.slice(1, 2).repeat(2), 16), r = parseInt(e.slice(2, 3).repeat(2), 16)) : o ? (n = parseInt(e.slice(0, 2), 16), l = parseInt(e.slice(2, 4), 16), r = parseInt(e.slice(4, 6), 16)) : i && (n = parseInt(e.slice(2, 4), 16), l = parseInt(e.slice(4, 6), 16), r = parseInt(e.slice(6, 8), 16)), (-16777216 | (n & 255) << 16 | (l & 255) << 8 | r & 255) >>> 0;
}
function Pn(e) {
  return (-16777216 | (e[0] & 255) << 16 | (e[1] & 255) << 8 | e[2] & 255) >>> 0;
}
function Vn(e, t, o) {
  return e /= 100, t /= 100, o /= 100, Pn([
    Math.round(un(255, 255 * En(3.2406 * e + -1.5372 * t + -0.4986 * o))),
    Math.round(un(255, 255 * En(-0.9689 * e + 1.8758 * t + 0.0415 * o))),
    Math.round(un(255, 255 * En(0.0557 * e + -0.204 * t + 1.057 * o)))
  ]);
}
function bn(e) {
  const t = (e + 16) / 116, o = 24389 / 27, i = t * t * t > 216 / 24389, n = [
    (i ? t * t * t : (116 * t - 16) / o) * sn[0],
    (8 < e ? t * t * t : e / o) * sn[1],
    (i ? t * t * t : (116 * t - 16) / o) * sn[2]
  ];
  return Vn(n[0], n[1], n[2]);
}
function xn(e) {
  const t = 0.008856451679035631, o = 24389 / 27, i = 100 * U(((e & 16711680) >> 16) / 255), n = 100 * U(((e & 65280) >> 8) / 255), l = 100 * U((e & 255) / 255), r = (0.2126 * i + 0.7152 * n + 0.0722 * l) / sn[1], a = r > t ? Math.pow(r, 1 / 3) : (o * r + 16) / 116, c = (0.41233895 * i + 0.35762064 * n + 0.18051042 * l) / sn[0], y = (0.01932141 * i + 0.11916382 * n + 0.95034478 * l) / sn[2];
  return [
    116 * a - 16,
    500 * ((c > t ? Math.pow(c, 1 / 3) : (o * c + 16) / 116) - a),
    200 * (a - (y > t ? Math.pow(y, 1 / 3) : (o * y + 16) / 116))
  ];
}
function Sn(e) {
  let t = 21.26 * U(((e & 16711680) >> 16) / 255) + 71.52 * U(((e & 65280) >> 8) / 255) + 7.22 * U((e & 255) / 255);
  return t /= 100, t <= 216 / 24389 ? 24389 / 27 * t : 116 * Math.pow(t, 1 / 3) - 16;
}
function Cn(e) {
  const t = 100 * U(((e & 16711680) >> 16) / 255), o = 100 * U(((e & 65280) >> 8) / 255), i = 100 * U((e & 255) / 255), n = 0.41233895 * t + 0.35762064 * o + 0.18051042 * i, l = 0.2126 * t + 0.7152 * o + 0.0722 * i, r = 0.01932141 * t + 0.11916382 * o + 0.95034478 * i, a = N.rgbD[0] * (0.401288 * n + 0.650173 * l - 0.051461 * r), c = N.rgbD[1] * (-0.250268 * n + 1.204414 * l + 0.045854 * r), y = N.rgbD[2] * (-2079e-6 * n + 0.048952 * l + 0.953127 * r), g = Math.pow(N.fl * Math.abs(a) / 100, 0.42), v = Math.pow(N.fl * Math.abs(c) / 100, 0.42), p = Math.pow(N.fl * Math.abs(y) / 100, 0.42), h = 400 * hn(a) * g / (g + 27.13), C = 400 * hn(c) * v / (v + 27.13), s = 400 * hn(y) * p / (p + 27.13), S = (11 * h + -12 * C + s) / 11, w = (h + C - 2 * s) / 9, E = 180 * Math.atan2(w, S) / Math.PI, A = 0 > E ? E + 360 : 360 <= E ? E - 360 : E, M = A * Math.PI / 180, b = 100 * Math.pow((40 * h + 20 * C + s) / 20 * N.nbb / N.aw, N.c * N.z), T = Math.pow(5e4 / 13 * 0.25 * (Math.cos((20.14 > A ? A + 360 : A) * Math.PI / 180 + 2) + 3.8) * N.nc * N.ncb * Math.sqrt(S * S + w * w) / ((20 * h + 20 * C + 21 * s) / 20 + 0.305), 0.9) * Math.pow(1.64 - Math.pow(0.29, N.n), 0.73), P = T * Math.sqrt(b / 100), u = 1 / 0.0228 * Math.log(1 + 0.0228 * P * N.fLRoot);
  return new Dn(A, P, b, 4 / N.c * Math.sqrt(b / 100) * (N.aw + 4) * N.fLRoot, 50 * Math.sqrt(T * N.c / (N.aw + 4)), (1 + 100 * 7e-3) * b / (1 + 7e-3 * b), u * Math.cos(M), u * Math.sin(M));
}
function Hn(e) {
  const t = O.is3p;
  console.debug("theme adapter from color");
  const o = new ot(lt(e));
  return new et({
    tones: o,
    seed: e,
    is3p: t,
    overrides: {},
    blend: !1,
    isBaseline: !1
  });
}
async function at(e) {
  const t = zn(new Blob([e], {
    type: "image/png"
  })), o = await new Promise((l, r) => {
    const a = new Image();
    a.onload = () => {
      l(a);
    }, a.onerror = () => {
      r();
    }, a.src = Gn(t);
  }), n = document.createElement("canvas").getContext("2d");
  if (n)
    return n.canvas.width = 112, n.canvas.height = 112, n.drawImage(o, 0, 0, o.width, o.height, 0, 0, n.canvas.width, n.canvas.height), n.getImageData(0, 0, o.width, o.height);
}
async function rt(e) {
  const t = new Uint8Array(e), o = await at(t), i = [];
  if (o)
    for (let n = 0; n < o.data.length; n += 4)
      255 > o.data[n + 3] || i.push(Pn([o.data[n], o.data[n + 1], o.data[n + 2]]));
  return i;
}
class ct {
  toInt(t) {
    var o = t[0];
    const i = 216 / 24389, n = 24389 / 27, l = (o + 16) / 116, r = t[1] / 500 + l, a = l - t[2] / 200, c = r * r * r, y = a * a * a;
    var g = [
      (c > i ? c : (116 * r - 16) / n) * WHITE_POINT_D65[0],
      (8 < o ? l * l * l : o / n) * WHITE_POINT_D65[1],
      (y > i ? y : (116 * a - 16) / n) * WHITE_POINT_D65[2]
    ];
    return intFromXyzComponents(g[0], g[1], g[2]);
  }
  distance(t, o) {
    const i = t[0] - o[0], n = t[1] - o[1], l = t[2] - o[2];
    return i * i + n * n + l * l;
  }
}
async function ut(e) {
  const t = typeof e == "string" ? await (await fetch(e)).arrayBuffer() : e, o = await rt(t), i = new $n();
  let n;
  i.weights = Array.from({
    length: 35937
  }).fill(0), i.momentsR = Array.from({
    length: 35937
  }).fill(0), i.momentsG = Array.from({
    length: 35937
  }).fill(0), i.momentsB = Array.from({
    length: 35937
  }).fill(0), i.moments = Array.from({
    length: 35937
  }).fill(0);
  let l;
  const r = /* @__PURE__ */ new Map();
  for (let u = 0; u < o.length; u++) {
    const f = o[u];
    255 > (f & 4278190080) >> 24 >>> 0 || r.set(f, ((l = r.get(f)) !== null && l !== void 0 ? l : 0) + 1);
  }
  for (const [u, f] of r.entries()) {
    const x = u, D = f, R = (x & 16711680) >> 16, m = (x & 65280) >> 8, F = x & 255, B = _((R >> 3) + 1, (m >> 3) + 1, (F >> 3) + 1);
    i.weights[B] = ((n = i.weights[B]) !== null && n !== void 0 ? n : 0) + D, i.momentsR[B] += D * R, i.momentsG[B] += D * m, i.momentsB[B] += D * F, i.moments[B] += D * (R * R + m * m + F * F);
  }
  for (let u = 1; 33 > u; u++) {
    const f = Array.from({
      length: 33
    }).fill(0), x = Array.from({
      length: 33
    }).fill(0), D = Array.from({
      length: 33
    }).fill(0), R = Array.from({
      length: 33
    }).fill(0), m = Array.from({
      length: 33
    }).fill(0);
    for (let F = 1; 33 > F; F++) {
      let B = 0, k = 0, z = 0, G = 0, H = 0;
      for (let I = 1; 33 > I; I++) {
        const V = _(u, F, I);
        B += i.weights[V], k += i.momentsR[V], z += i.momentsG[V], G += i.momentsB[V], H += i.moments[V], f[I] += B, x[I] += k, D[I] += z, R[I] += G, m[I] += H;
        const L = _(u - 1, F, I);
        i.weights[V] = i.weights[L] + f[I], i.momentsR[V] = i.momentsR[L] + x[I], i.momentsG[V] = i.momentsG[L] + D[I], i.momentsB[V] = i.momentsB[L] + R[I], i.moments[V] = i.moments[L] + m[I];
      }
    }
  }
  let a = qn(i).resultCount;
  const c = [];
  for (let u = 0; u < a; ++u) {
    const f = i.cubes[u], x = i.volume(f, i.weights);
    if (0 < x) {
      const D = Math.round(i.volume(f, i.momentsR) / x), R = Math.round(i.volume(f, i.momentsG) / x), m = Math.round(i.volume(f, i.momentsB) / x);
      c.push(-16777216 | (D & 255) << 16 | (R & 255) << 8 | m & 255);
    }
  }
  const y = /* @__PURE__ */ new Map(), g = [], v = [], p = new ct();
  let h = 0;
  for (let u = 0; u < o.length; u++) {
    const f = o[u], x = y.get(f);
    x === void 0 ? (h++, g.push(xn(f)), v.push(f), y.set(f, 1)) : y.set(f, x + 1);
  }
  const C = [];
  for (let u = 0; u < h; u++) {
    const f = y.get(v[u]);
    f !== void 0 && (C[u] = f);
  }
  let s = Math.min(256, h);
  0 < c.length && (s = Math.min(s, c.length));
  const S = [];
  for (let u = 0; u < c.length; u++)
    S.push(xn(c[u]));
  const w = s - S.length;
  if (c.length === 0 && 0 < w)
    for (let u = 0; u < w; u++)
      S.push([100 * Math.random(), 201 * Math.random() + -100, 201 * Math.random() + -100]);
  const E = [];
  for (let u = 0; u < h; u++)
    E.push(Math.floor(Math.random() * s));
  const A = [];
  for (let u = 0; u < s; u++) {
    A.push([]);
    for (let f = 0; f < s; f++)
      A[u].push(0);
  }
  const M = [];
  for (let u = 0; u < s; u++) {
    M.push([]);
    for (let f = 0; f < s; f++)
      M[u].push(new jn());
  }
  const b = [];
  for (let u = 0; u < s; u++)
    b.push(0);
  for (let u = 0; 10 > u; u++) {
    for (let m = 0; m < s; m++) {
      for (let F = m + 1; F < s; F++) {
        const B = p.distance(S[m], S[F]);
        M[F][m].distance = B, M[F][m].index = m, M[m][F].distance = B, M[m][F].index = F;
      }
      M[m].sort();
      for (let F = 0; F < s; F++)
        A[m][F] = M[m][F].index;
    }
    let f = 0;
    for (let m = 0; m < h; m++) {
      const F = g[m], B = E[m], k = p.distance(F, S[B]);
      let z = k, G = -1;
      for (let H = 0; H < s; H++) {
        if (M[B][H].distance >= 4 * k)
          continue;
        const I = p.distance(F, S[H]);
        I < z && (z = I, G = H);
      }
      G !== -1 && 3 < Math.abs(Math.sqrt(z) - Math.sqrt(k)) && (f++, E[m] = G);
    }
    if (f === 0 && u !== 0)
      break;
    const x = Array(s).fill(0), D = Array(s).fill(0), R = Array(s).fill(0);
    for (let m = 0; m < s; m++)
      b[m] = 0;
    for (let m = 0; m < h; m++) {
      const F = E[m], B = g[m], k = C[m];
      b[F] += k, x[F] += B[0] * k, D[F] += B[1] * k, R[F] += B[2] * k;
    }
    for (let m = 0; m < s; m++) {
      const F = b[m];
      S[m] = F === 0 ? [0, 0, 0] : [x[m] / F, D[m] / F, R[m] / F];
    }
  }
  const T = /* @__PURE__ */ new Map();
  for (let u = 0; u < s; u++) {
    const f = b[u];
    if (f === 0)
      continue;
    const x = p.toInt(S[u]);
    T.has(x) || T.set(x, f);
  }
  const P = Jn(T);
  return In(P[0]);
}
function st(e) {
  if (!e.startsWith("#"))
    throw new Error("Must start with #");
  const t = Hn(e);
  return {
    light: t.light,
    dark: t.dark
  };
}
async function dt(e) {
  let t = e;
  (e instanceof Blob || e instanceof File) && (t = URL.createObjectURL(e)), e.target && e.target.files[0] && (t = URL.createObjectURL(e.target.files[0])), e.files && e.files[0] && (t = URL.createObjectURL(e.files[0]));
  const o = await ut(t), i = Hn(o);
  return {
    light: i.light,
    dark: i.dark
  };
}
export {
  st as mDCFromHex,
  dt as materialDynamicColors
};
