import { setup, assign } from "xstate";
import { useActor } from "@xstate/solid";
import JSConfetti from "js-confetti";

export const machine = setup({
  types: {
    context: {} as { count: number },
    events: {} as
      | { type: "INCREMENT" }
      | { type: "DECREMENT" }
      | { type: "RESET" },
  },
  actions: {
    showConfetti: function () {
      new JSConfetti().addConfetti();
    },
    incrementCount: assign({
      count: ({ context }) => context.count + 1,
    }),
    decrementCount: assign({
      count: ({ context }) => context.count - 1,
    }),
    resetCount: assign({
      count: 0,
    }),
  },
  guards: {
    isTen: function ({ context }) {
      return context.count === 10;
    },
    isZero: function ({ context }) {
      return context.count === 0;
    },
  },
}).createMachine({
  context: {
    count: 0,
  },
  id: "Counter",
  initial: "Idle",
  states: {
    Idle: {
      on: {
        INCREMENT: [
          {
            target: "Done",
            actions: {
              type: "showConfetti",
            },
            guard: {
              type: "isTen",
            },
          },
          {
            target: "Idle",
            actions: {
              type: "incrementCount",
            },
          },
        ],
        DECREMENT: [
          {
            target: "Idle",
            guard: {
              type: "isZero",
            },
          },
          {
            target: "Idle",
            actions: {
              type: "decrementCount",
            },
          },
        ],
        RESET: {
          target: "Idle",
          actions: {
            type: "resetCount",
          },
        },
      },
    },
    Done: {
      on: {
        RESET: {
          target: "Idle",
          actions: {
            type: "resetCount",
          },
        },
      },
    },
  },
});

export function CounterMachine() {
  const [state, send] = useActor(machine);

  const double = () => state.context.count * 2;

  return (
    <div>
      <div>
        <button
          onClick={() => send({ type: "DECREMENT" })}
          disabled={!state.can({ type: "DECREMENT" })}
        >
          -
        </button>
        <span>{state.context.count}</span>
        <button
          onClick={() => send({ type: "INCREMENT" })}
          disabled={!state.can({ type: "INCREMENT" })}
        >
          +
        </button>
        <button
          onClick={() => send({ type: "RESET" })}
          disabled={!state.can({ type: "RESET" })}
        >
          Reset
        </button>
      </div>

      <div>{double()}</div>
    </div>
  );
}
