import React, { Suspense, useEffect } from "react";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const AddItem = React.lazy(() => import("./containers/AddItem/AddItem"));
const Market = React.lazy(() => import("./containers/Market/Market"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const MyItems = React.lazy(() => import("./containers/MyItems/MyItems"));

const App = (props) => {
  const { onTryAutoSignup } = props;
  useEffect(() => onTryAutoSignup(), [onTryAutoSignup]);
  let routes = (
    <Switch>
      <Route
        path="/"
        exact
        render={(props) => <Market notAuthenticated {...props} />}
      />
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/additem" render={(props) => <AddItem {...props} />} />
        <Route path="/myitems" render={(props) => <MyItems {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact render={(props) => <Market {...props} />} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <>
      <Layout>
        <Suspense
          fallback={
            <h3
              style={{
                transform: "translate(50%,-50%)",
                position: "absolute",
                top: "50%",
                right: "50%",
                color: "#e3b23c",
                textAlign: "center",
                zIndex: "10",
              }}
            >
              Loading...
            </h3>
          }
        >
          {routes}
        </Suspense>
      </Layout>
    </>
  );
};

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
