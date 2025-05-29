export function removeDuplicates(array: any[]) {
  return array.filter((item, index, arr) => {
    return arr.findIndex((i) => i === item) === index;
  });
}
