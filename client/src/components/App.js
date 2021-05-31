import React from "react";
import "../App.css";
import {Route, BrowserRouter as Router} from "react-router-dom";
import CocktailPage from "../pages/CocktailPage";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/cocktail" component={CocktailPage}/>
        </Router>
      </div>
    );
  }
}

export default App;
