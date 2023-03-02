import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components";
import { AviationArrival, AviationDeparture, Home } from "./pages";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/arrival/" component={AviationArrival} />
          <Route path="/departure/" component={AviationDeparture} />
        </Switch>
        <footer className="position-absolute bottom-0 start-50 translate-middle-x text-white">
          <p>
            Creado por <a href="https://Github.com/JuanOsccoMori" target="_blank" rel="noreferrer">@Juan</a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
