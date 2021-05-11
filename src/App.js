import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {
    NavigationBar,
    SideBar,
    Home,
    Page404,
    Login,
    Register,
    Search
} from './components'

import './App.css';


function App(props) {

    const [sideDrawer, setSideDrawer] = React.useState(false);

    return (
        <BrowserRouter>
            <div className="App">
                <NavigationBar setDrawer={setSideDrawer} />
                <SideBar drawer={sideDrawer} setDrawer={setSideDrawer} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/logout" component={Page404} />
                    <Route exact path="/search" component={Search} />
                    <Route component={Page404} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
