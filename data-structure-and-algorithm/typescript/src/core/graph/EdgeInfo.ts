export default class EdgeInfo<V, E> {
  constructor(private _from: V, private _to: V, private _weight: E) {}
  getFrom(): V {
    return this._from;
  }
  setFrom(from: V): void {
    this._from = from;
  }
  getTo(): V {
    return this._to;
  }
  setTo(to: V): void {
    this._to = to;
  }
  getWeight(): E {
    return this._weight;
  }
  setWeight(weight: E): void {
    this._weight = weight;
  }
  toString(): string {
    return (
      "EdgeInfo [from=" +
      this._from +
      ", to=" +
      this._to +
      ", weight=" +
      this._weight +
      "]"
    );
  }
}
