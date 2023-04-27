function getIndex(r: number, g: number, b: number) {
	return (r << 10) + (r << 6) + r + (g << 5) + g + b;
}

export default getIndex;
