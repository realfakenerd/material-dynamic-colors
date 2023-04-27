function isTheme3p(theme) {
	let _a, _b;
	return (
		'Roboto' ===
		(null ===
			(_b =
				null === (_a = null === theme || void 0 === theme ? void 0 : theme.styles) || void 0 === _a
					? void 0
					: _a.headline1) || void 0 === _b
			? void 0
			: _b.fontFamilyName)
	);
}

export default isTheme3p;
