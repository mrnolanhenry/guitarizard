// Given an array with numeric values, sort them in ascending order.
const sortNumericArray = (array: number[]): number[] => {
	array.sort(function (a: number, b: number): number {
		return a - b;
	});
	return array;
};

export { sortNumericArray };
