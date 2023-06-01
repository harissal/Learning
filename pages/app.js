import "./App.css";
import Todo from "./Todo";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <div className="App">
        <Todo />
      </div>
    </MantineProvider>
  );
}

export default App;
