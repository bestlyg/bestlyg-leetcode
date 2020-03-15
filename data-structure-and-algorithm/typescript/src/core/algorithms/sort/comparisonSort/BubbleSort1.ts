import Sort, { mixinSort } from "../Sort";
export default mixinSort(
  class BubbleSort1 extends Sort {
    protected sort(): void {
      super.sort();
      for (let end = this.array.length; end > 0; end--) {
        for (let begin = 1; begin < end; begin++) {
          if (this.compareIndex(begin, begin - 1) < 0)
            this.swap(begin, begin - 1);
        }
      }
    }
  }
);
