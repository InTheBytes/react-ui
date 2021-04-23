import './App.css';
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import NavigationBar from "./components/Header/NavigationBar";
import Sidebar from "./components/SideBar/SideBar";

import Home from "./components/Home";
import Page404 from "./components/Error/Page404";

function App(props) {

    const [sideDrawer, setSideDrawer] = React.useState(false);

    return (
        <BrowserRouter>
            <div className="App">
                <NavigationBar setDrawer={setSideDrawer} />
                <Sidebar drawer={sideDrawer} setDrawer={setSideDrawer} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route component={Page404} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
