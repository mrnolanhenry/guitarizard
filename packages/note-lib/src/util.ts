// Given an array with numeric values, sort them in ascending order.
const sortArray = <T,>(array: Array<T>): Array<T> => {
  array.sort(function (a: any, b: any): number {
    return a - b;
  });
  return array;
};

export { sortArray };
