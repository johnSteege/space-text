/**
 * Returns a random integer between min (inclusive) and
 * max (inclusive) following a linear distribution.
 *
 * @param min - inclusive minimum
 * @param max - inclusive maximum
 * @returns random integer
 *
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
 *
 */
Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

/**
 * A number that is bounded by a minimum and maximum value.
 *
 */
export type BoundedNumber = {
  get(): number;
  set(value: number): void;
  min(): number;
  max(): number;
  add(amount: number): number;
  isAtMin(): boolean;
  isAtMax(): boolean;
};

/**
 * Creates a new bounded number.
 *
 * @param initialValue The initial value
 * @param minimum The minimum value
 * @param maximum The maximum value
 * @returns The new bounded number
 *
 */
export function createBoundedNumber(
  initialValue: number,
  minimum: number = 0,
  maximum: number = initialValue
): BoundedNumber {
  let value: number = initialValue;

  const get = () => value;

  const set = (newValue: number) => {
    value = constrain(newValue);
  };

  const min = (): number => {
    return minimum;
  };

  const max = (): number => {
    return maximum;
  };

  function constrain(v: number): number {
    return Math.min(Math.max(v, minimum), maximum);
  }

  function remainder(v: number): number {
    return v - constrain(v);
  }

  /**
   * Add the amount to the current value.
   *
   * @param amount The amount to add
   * @returns The remainder after adding the amount
   */
  const add = (amount: number): number => {
    const result = remainder(value + amount);

    value += amount;

    return result;
  };

  const isAtMin = (): boolean => {
    return value <= minimum;
  };

  const isAtMax = (): boolean => {
    return value >= maximum;
  };

  return {
    get,
    set,
    min,
    max,
    add,
    isAtMin,
    isAtMax,
  };
}
