import { CounterImperative } from "./components/CounterImperative";
import { CounterStates } from "./components/CounterStates";
import { CounterMachine } from "./components/CounterMachine";
import "./App.css";

function App() {
  return (
    <div>
      <CounterImperative />
      <CounterStates />
      <CounterMachine />
    </div>
  );
}

export default App;
