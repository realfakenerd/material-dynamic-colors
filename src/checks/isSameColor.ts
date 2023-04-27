function isSameColor(target: string, expected: string) {
	return (
		(null === target || void 0 === target ? void 0 : target.toUpperCase()) ===
		(null === expected || void 0 === expected ? void 0 : expected.toUpperCase())
	);
}

export default isSameColor;
