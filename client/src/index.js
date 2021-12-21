import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import OtherPage from "./OtherPage";
import Header from "./Header";

ReactDOM.render(
  <Router>
    <Header />
    <div className="nav-bar">
      <Link className="nav__item" to="/">
        Home
      </Link>
      <Link className="nav__item" to="/otherpage">
        Other Page
      </Link>
    </div>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/otherpage" element={<OtherPage />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
