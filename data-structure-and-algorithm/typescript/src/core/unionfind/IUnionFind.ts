export default interface IUnionFind {
  find(v: number): number;
  union(v1: number, v2: number): void;
  isSame(v1: number, v2: number): boolean;
}
