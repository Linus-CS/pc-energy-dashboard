import { useState } from "react";
import "./App.css";
import Home from "./Home";
import Nav from "./Nav";
import Settings from "./Settings";

function App() {
  const [id, setId] = useState(0);
  const sites = [<Home />, <Settings />];

  return (
    <div className="App">
      <Nav changeSite={(id: number) => setId(id)} />
      <header className="App-header">{sites[0]}</header>
    </div>
  );
}

export default App;
