import { useEffect, useState, Fragment } from "react";
import "./App.css";
import Form from "./Form";
import axios from "axios";

function App() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const indexes = await axios.get("/api/values/all");
    setSeenIndexes(indexes.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("/api/values", {
      index: parseInt(index)
    });
    setIndex("");
  };

  const renderIndexes = () => {
    return (
      <div>
        <h2>Indexes I have seen: </h2>
        <p>{seenIndexes.map((v) => v.number).join(", ")}</p>
      </div>
    );
  };

  const renderCalculatedValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(`For index ${key} I calculated ${values[key]}`);
    }
    return (
      <Fragment>
        <h2>Calculated values: </h2>
        <ul className="list">
          {entries.map((item, i) => (
            <li key={i} className="list__item">
              {item}
            </li>
          ))}
        </ul>
      </Fragment>
    );
  };

  const handleChange = (event) => {
    setIndex(event.target.value);
  };

  return (
    <div className="App">
      <Form
        label="Enter your index:"
        onSubmit={handleSubmit}
        name="fibIndex"
        value={index}
        onChange={handleChange}
      />
      {renderIndexes()}
      {renderCalculatedValues()}
    </div>
  );
}

export default App;
