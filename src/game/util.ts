/**
 * Returns a random integer between min (inclusive) and
 * max (inclusive) following a linear distribution.
 *
 * @param min - inclusive minimum
 * @param max - inclusive maximum
 * @returns random integer
 */
export function randomIntLinear(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

declare global {
  interface Array<T> {
    randomElement(): T;
  }
}

/**
 * Returns a random element from the array.
 *
 * @returns random element
 */
Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// export function test(): void {
//   let results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//   for (let i = 0; i < 1000; i++) {
//     results[randomIntLinear(1, 2)] += 1;
//   }

//   console.log(results);
// }
