import React, { useState, useMemo } from "react";
import { Router, Route, Switch } from "react-router-dom";
import "../styles/global.scss"
import history from "../history";
import { Home, Subjects, Quiz } from "../pages";
import { Header, Footer } from "../components"
import { UserContext } from "../context/userContext";

const App = () => {
    const [username, setUsername] = useState('');
    const providerValue = useMemo(() => ({ username, setUsername }), [username, setUsername]);

    return (
        <Router history={history}>
            <Header />
            <Switch>
                <UserContext.Provider value={providerValue}>
                    <Route path="/" exact component={Home} />
                    <Route path="/subjects" component={Subjects} />
                    <Route path="/quiz/:subject" component={Quiz} />
                </UserContext.Provider>
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;