import Box from './Box';
import getIndex from '../utils/getIndex';

export default class QuantizerWu {
	weights: number[] = [];
	moments: number[] = [];
	momentsR: number[] = [];
	momentsG: number[] = [];
	momentsB: number[] = [];
	cubes: Box[] = [];

	volume(cube: Box, moment: number[]) {
		return (
			moment[getIndex(cube.r1, cube.g1, cube.b1)] -
			moment[getIndex(cube.r1, cube.g1, cube.b0)] -
			moment[getIndex(cube.r1, cube.g0, cube.b1)] +
			moment[getIndex(cube.r1, cube.g0, cube.b0)] -
			moment[getIndex(cube.r0, cube.g1, cube.b1)] +
			moment[getIndex(cube.r0, cube.g1, cube.b0)] +
			moment[getIndex(cube.r0, cube.g0, cube.b1)] -
			moment[getIndex(cube.r0, cube.g0, cube.b0)]
		);
	}
	bottom(cube: Box, direction: 'red' | 'green' | 'blue', moment: number[]) {
		switch (direction) {
			case 'red':
				return (
					-moment[getIndex(cube.r0, cube.g1, cube.b1)] +
					moment[getIndex(cube.r0, cube.g1, cube.b0)] +
					moment[getIndex(cube.r0, cube.g0, cube.b1)] -
					moment[getIndex(cube.r0, cube.g0, cube.b0)]
				);
			case 'green':
				return (
					-moment[getIndex(cube.r1, cube.g0, cube.b1)] +
					moment[getIndex(cube.r1, cube.g0, cube.b0)] +
					moment[getIndex(cube.r0, cube.g0, cube.b1)] -
					moment[getIndex(cube.r0, cube.g0, cube.b0)]
				);
			case 'blue':
				return (
					-moment[getIndex(cube.r1, cube.g1, cube.b0)] +
					moment[getIndex(cube.r1, cube.g0, cube.b0)] +
					moment[getIndex(cube.r0, cube.g1, cube.b0)] -
					moment[getIndex(cube.r0, cube.g0, cube.b0)]
				);
			default:
				throw Error('unexpected direction $direction');
		}
	}
	top(cube: Box, direction: 'red' | 'green' | 'blue', position: number, moment: number[]) {
		switch (direction) {
			case 'red':
				return (
					moment[getIndex(position, cube.g1, cube.b1)] -
					moment[getIndex(position, cube.g1, cube.b0)] -
					moment[getIndex(position, cube.g0, cube.b1)] +
					moment[getIndex(position, cube.g0, cube.b0)]
				);
			case 'green':
				return (
					moment[getIndex(cube.r1, position, cube.b1)] -
					moment[getIndex(cube.r1, position, cube.b0)] -
					moment[getIndex(cube.r0, position, cube.b1)] +
					moment[getIndex(cube.r0, position, cube.b0)]
				);
			case 'blue':
				return (
					moment[getIndex(cube.r1, cube.g1, position)] -
					moment[getIndex(cube.r1, cube.g0, position)] -
					moment[getIndex(cube.r0, cube.g1, position)] +
					moment[getIndex(cube.r0, cube.g0, position)]
				);
			default:
				throw Error('unexpected direction $direction');
		}
	}
}
