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

export class ConstrainedNumber {
  private _value: number;
  private readonly min: number;
  private readonly max: number;

  constructor(initialValue: number, min: number = 0, max: number) {
    this._value = initialValue;
    this.min = min;
    this.max = max;
  }

  private constrain(v: number): number {
    return Math.min(Math.max(v, this.min), this.max);
  }

  private remainder(v: number): number {
    return v - this.constrain(v);
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = this.constrain(value);
  }

  add(amount: number): number {
    const remainder = this.remainder(this._value + amount);

    this.value = this._value + amount;

    return remainder;
  }

  isAtMin(): boolean {
    return this._value <= this.min;
  }

  isAtMax(): boolean {
    return this._value >= this.max;
  }
}
