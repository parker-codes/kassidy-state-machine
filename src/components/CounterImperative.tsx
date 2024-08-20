import { createSignal, createEffect } from "solid-js";
import JSConfetti from "js-confetti";

export function CounterImperative() {
  const [count, setCount] = createSignal(0);
  const [done, setDone] = createSignal(false);

  function decrement() {
    if (done()) return;
    if (count() === 0) return;
    setCount(count() - 1);
  }
  function increment() {
    if (done()) return;
    if (count() === 10) {
      setDone(true);
      return;
    }
    setCount(count() + 1);
  }
  function reset() {
    setCount(0);
    setDone(false);
  }

  createEffect(() => {
    if (count() === 10) {
      new JSConfetti().addConfetti();
    }
  });

  const double = () => count() * 2;

  return (
    <div>
      <div>
        <button onClick={decrement} disabled={done()}>
          -
        </button>
        <span onClick={increment}>{count()}</span>
        <button onClick={increment} disabled={done()}>
          +
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div>{double()}</div>
    </div>
  );
}
