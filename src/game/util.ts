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
Array.prototype.randomElement = function <T>(): T {
  return this[Math.floor(Math.random() * this.length)];
};

/**
 * A number that is bounded by a minimum and maximum value.
 *
 */
export interface BoundedNumber {
  get(): number;
  set(value: number): void;
  setToMin(): void;
  setToMax(): void;
  min(): number;
  max(): number;
  add(amount: number): number;
  isAtMin(): boolean;
  isAtMax(): boolean;
}

/**
 * Creates a new bounded number.
 *
 * @param initialValue The initial value
 * @param minimum The minimum value
 * @param maximum The maximum value
 * @returns The new bounded number
 *
 */
export function buildBoundedNumber(
  initialValue: number,
  minimum: number = 0,
  maximum: number = initialValue
): BoundedNumber {
  type hidden = {
    _value: number;
    _min: number;
    _max: number;
    constrain: (v: number) => number;
    remainder: (v: number) => number;
  };

  const result: BoundedNumber & hidden = {
    _value: initialValue,
    _min: minimum,
    _max: maximum,
    constrain: function (v: number): number {
      return Math.min(Math.max(v, this._min), this._max);
    },
    remainder: function (v: number): number {
      return v - this.constrain(v);
    },
    get: function (): number {
      return this._value;
    },
    set: function (newValue: number): void {
      this._value = this.constrain(newValue);
    },
    setToMin: function (): void {
      this._value = minimum;
    },
    setToMax: function (): void {
      this._value = maximum;
    },
    min: function (): number {
      return this._min;
    },
    max: function (): number {
      return this._max;
    },
    // /**
    //  * Add the amount to the current value.
    //  *
    //  * @param amount The amount to add
    //  * @returns The remainder after adding the amount
    //  */
    add: function (amount: number): number {
      const result = this.remainder(this._value + amount);

      this._value += amount;

      return result;
    },
    isAtMin: function (): boolean {
      return this._value <= this._min;
    },
    isAtMax: function (): boolean {
      return this._value >= this._max;
    },
  };

  return result;
}
