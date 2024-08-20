import { createSignal, createEffect } from "solid-js";
import JSConfetti from "js-confetti";

type State = "idle" | "done";

export function CounterStates() {
  const [count, setCount] = createSignal(0);
  const [state, setState] = createSignal<State>("idle");

  function decrement() {
    if (state() === "done") return;
    if (count() === 0) return;
    setCount(count() - 1);
  }
  function increment() {
    if (state() === "done") return;
    if (count() === 10) {
      setState("done");
      return;
    }
    setCount(count() + 1);
  }
  function reset() {
    setCount(0);
    setState("idle");
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
        <button onClick={decrement} disabled={state() === "done"}>
          -
        </button>
        <span onClick={increment}>{count()}</span>
        <button onClick={increment} disabled={state() === "done"}>
          +
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div>{double()}</div>
    </div>
  );
}
