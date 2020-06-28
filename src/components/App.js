import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import "../styles/global.scss"
import history from "../history";
import { Home, Subjects, Quiz } from "../pages";
import Header from "./Header/Header";

const App = () => {
    return (
        <Router history={history}>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/subjects" component={Subjects} />
                <Route path="/quiz" component={Quiz} />
            </Switch>
        </Router>
    );
};

export default App;