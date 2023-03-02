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
          <Route path='/' exact component={Home}/>
          <Route path='/arrival/'component={AviationArrival}/>
          <Route path="/departure/" component={AviationDeparture}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
