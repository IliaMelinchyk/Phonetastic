import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Logout from "./components/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import AsyncComponent from "./components/AsyncComponent/AsyncComponent";

const asyncAddItem = AsyncComponent(() =>
  import("./components/AddItem/AddItem")
);
const asyncMarket = AsyncComponent(() => import("./components/Market/Market"));
const asyncAuth = AsyncComponent(() => import("./components/Auth/Auth"));
const asyncMyItems = AsyncComponent(() =>
  import("./components/MyItems/MyItems")
);
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <>
        <Route path="/" exact component={asyncMarket} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <>
          <Route path="/additem" component={asyncAddItem} />
          <Route path="/myitems" component={asyncMyItems} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={asyncMarket} />
          <Redirect to="/" />
        </>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
