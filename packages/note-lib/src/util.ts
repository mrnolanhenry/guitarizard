// Given an array with numeric values, sort them in ascending order.
const sortArray = function (array: any[]) {
  array.sort(function (a: any, b: any): number {
    return a - b;
  });
  return array;
};

// Check if 2 one-dimensional arrays are equal to each other.
const isEqualArray1D = function (array1: any[], array2: any[]): boolean {
  let len: number  = array1.length;
  if (len === array2.length) {
    for (let i = 0; i < len; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};

// let arr1 = [0, 1, 2];
// let arr2 = [0, 1, 2];
// let equalCheck = exports.isEqualArray1D(arr1, arr2);
// console.log(equalCheck);

export { isEqualArray1D, sortArray }