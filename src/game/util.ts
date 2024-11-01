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

//
export type BoundedNumber = {
  get(): number;
  set(value: number): void;
  add(amount: number): number;
  isAtMin(): boolean;
  isAtMax(): boolean;
};

export function createBoundedNumber(
  initialValue: number,
  min: number,
  max: number
): BoundedNumber {
  let value: number = initialValue;

  const set = (newValue: number) => {
    value = constrain(newValue);
  };

  const get = () => value;

  function constrain(v: number): number {
    return Math.min(Math.max(v, min), max);
  }

  function remainder(v: number): number {
    return v - constrain(v);
  }

  const add = (amount: number): number => {
    const result = remainder(value + amount);

    value += amount;

    return result;
  };

  const isAtMin = (): boolean => {
    return value <= min;
  };

  const isAtMax = (): boolean => {
    return value >= max;
  };

  return {
    get,
    set,
    add,
    isAtMin,
    isAtMax,
  };
}
