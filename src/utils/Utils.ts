export function getLowestInteger(forbiddenNumbers: number[]) {
  let lowestInteger = 0;
  if (forbiddenNumbers.length === 0) return lowestInteger;
  // Sort the forbiddenNumbers array in ascending order
  forbiddenNumbers.sort((a, b) => a - b);
  // Iterate through the sorted array and check if each number is equal to or greater than the lowest integer
  for (let i = 0; i < forbiddenNumbers.length; i++) {
    if (forbiddenNumbers[i] <= lowestInteger) {
      // If the current number is equal to or less than the lowest integer, increment the lowest integer
      lowestInteger++;
    } else {
      // If the current number is greater than the lowest integer, return the lowest integer
      return lowestInteger;
    }
  }

  // If we have iterated through the entire array and not found a gap, the lowest integer is one greater than the highest number in the array
  return forbiddenNumbers[forbiddenNumbers.length - 1] + 1;
}

export const hexColorArray = [
  "#FF000060", // Red with 50% transparency
  "#00FF0060", // Green with 50% transparency
  "#0000FF60", // Blue with 50% transparency
  "#FFFF0060", // Yellow with 50% transparency
  "#FF00FF60", // Magenta with 50% transparency
  "#00FFFF60", // Cyan with 50% transparency
  "#80008060", // Purple with 50% transparency
  "#00808060", // Teal with 50% transparency
  "#FFA50060", // Orange with 50% transparency
  "#00800060", // Olive with 50% transparency
];
