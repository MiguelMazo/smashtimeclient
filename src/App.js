import './App.css';
import React from 'react';
import Axios from 'axios';
import Header from './Header';
import Home from './Home';
import About from './About';
import Graph from './Graph';
import {BrowserRouter as Router, Switch, Route}
from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state= {apiResponse: ""};
    }

  
    render(){
      return (
        <Router>
            <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
  crossorigin="anonymous"
/>
            <div className="app">
                <Header />
                <Switch>

                    {/* ABOUT PAGE */}
                    <Route path="/about">
                        <About />
                    </Route>

                    {/*GRAPH PAGE */}
                    <Route path="/graph">
                        <Graph />
                    </Route>

                    {/* HOME PAGE */}
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
      );
    }
}

export default App;
