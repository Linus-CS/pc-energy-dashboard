import { useEffect, useState } from "react";
import "./Home.css";
import Computer from "./Computer";

function Home() {
  const [name, setName] = useState("");
  const [id, setId] = useState(-1);

  const [computers, setComputers] = useState<any>([]);

  const addComputer = () => {
    setComputers([...computers, <Computer name={name} id={id} />]);
  };

  return (
    <div className="Home">
      <h1>Computers</h1>
      <input
        style={{ margin: "2%" }}
        type="text"
        onBlur={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        onBlur={(e) => setId(parseInt(e.target.value))}
        placeholder="Id"
      />
      <button onClick={() => addComputer()}>Subscribe</button>
      <ul>{computers}</ul>
    </div>
  );
}

export default Home;
