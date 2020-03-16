import { getClassName } from "../../../utils";
import { numberString, padCompletion, repeat } from "../../../utils";
import { ISort } from "../../../types";
export default abstract class Sort {
  public array: number[];
  public swapCount: number = 0;
  public compareCount: number = 0;
  public time: number = 0;
  constructor(array: number[]) {
    this.array = array;
    const start = new Date().getTime();
    this.sort();
    this.time = new Date().getTime() - start;
  }
  protected swap(index1: number, index2: number) {
    const temp = this.array[index1];
    this.array[index1] = this.array[index2];
    this.array[index2] = temp;
    this.swapCount++;
  }
  protected compareIndex(index1: number, index2: number): number {
    this.compareCount++;
    return this.array[index1] - this.array[index2];
  }
  protected compareElement(element1: number, element2: number): number {
    this.compareCount++;
    return element1 - element2;
  }
  protected abstract sort(): void;
  public toString(name: string): string {
    const time = "耗时：" + this.time / 1000.0 + "s(" + this.time + "ms)";
    const compareCount = "比较：" + numberString(this.compareCount);
    const swapCount = "交换：" + numberString(this.swapCount);
    return (
      `【${name}】\n` +
      _padComp(time) +
      _padComp(compareCount) +
      _padComp(swapCount) +
      "\n" +
      repeat("-", 60)
    );
    function _padComp(string: string): string {
      const countNum = 20;
      return padCompletion(string, countNum, " ", "End");
    }
  }
}
export function mixinSort(
  sort: new (array: number[]) => Sort
): (array: number[]) => ISort {
  return function(arr: number[]) {
    const result = new sort(arr);
    const { array, swapCount, compareCount, time } = result;
    const name = getClassName(result);
    const string = result.toString(name);
    return {
      name,
      array,
      swapCount,
      compareCount,
      time,
      string,
      toString: () => string
    };
  };
}
