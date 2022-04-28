import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Map from "./components/Map/Map";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/map">
            <Map />
          </Route>
          <Route path="/">
            <Redirect to="/map" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
