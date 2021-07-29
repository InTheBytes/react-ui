import React from "react";
import useLocalStorage from "react-use-localstorage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
  NavigationBar,
  SideBar,
  Home,
  Page404,
  Login,
  Logout,
  Register,
  ConfirmEmail,
  Search,
  ViewFood,
  ViewRestaurant,
  OrderHistory,
  Profile,
  ViewMenu,
} from "./components";

import "./App.css";
import AuthContext from "./components/Authentication/AuthContext";
import CartContext from "./components/Cart/CartContext";
import CartBar from "./components/Cart/CartBar";
import ResetPassword from "./components/Authentication/ResetPassword";
import SubmitOrder from "./components/Order/SubmitOrder";

function App(props) {
  const [sideDrawer, setSideDrawer] = React.useState(false);
  const [cartDrawer, setCartDrawer] = React.useState(false);
  const [auth, setAuth] = useLocalStorage("jwtAuth", "");
  const [cart, setCart] = React.useState({});

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
        <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
          <div className="App">
            <NavigationBar
              setDrawer={setSideDrawer}
              setCartDrawer={setCartDrawer}
            />
            <SideBar drawer={sideDrawer} setDrawer={setSideDrawer} />
            <CartBar drawer={cartDrawer} setDrawer={setCartDrawer} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/success" component={ConfirmEmail} />
              <Route exact path="/search" component={Search} />
              <Route path="/foods/:id" component={ViewFood} />
              <Route path="/restaurants/:id" component={ViewRestaurant} />
              <Route path="/menus/:id" component={ViewMenu} />
              <Route path="/reset-password/:token" component={ResetPassword} />
              <Route path="/checkout" component={SubmitOrder} />
              <Route
                path="/orders"
                render={() => <OrderHistory auth={auth} />}
              />
              <Route path="/profile" render={() => <Profile auth={auth} />} />
              <Route component={Page404} />
            </Switch>
          </div>
        </CartContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
