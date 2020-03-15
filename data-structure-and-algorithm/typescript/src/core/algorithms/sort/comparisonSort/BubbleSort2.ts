import Sort, { mixinSort } from "../Sort";
export default mixinSort(
  class BubbleSort2 extends Sort {
    protected sort(): void {
      for (let end = this.array.length; end > 0; end--) {
        let sorted = true;
        for (let begin = 1; begin < end; begin++) {
          if (this.compareIndex(begin, begin - 1) < 0) {
            this.swap(begin, begin - 1);
            sorted = false;
          }
        }
        if (sorted) break;
      }
    }
  }
);
