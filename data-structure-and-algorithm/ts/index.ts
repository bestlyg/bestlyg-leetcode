import Fibonacci from "./src/code/Fibonacci";
import { time } from "./src/utils";
time("fib1", () => {
  const fib1 = Fibonacci.fib1(30);
  console.log(fib1);
});
time("fib2", () => {
  const fib2 = Fibonacci.fib2(30);
  console.log(fib2);
});
time("fib3", () => {
  const fib3 = Fibonacci.fib3(30);
  console.log(fib3);
});
