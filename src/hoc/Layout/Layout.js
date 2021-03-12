import React, { useState } from "react";
import { connect } from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Footer from "../../components/Footer/Footer";
import classes from "./Layout.module.scss";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  return (
    <div className={classes.Background}>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={() => setShowSideDrawer(!showSideDrawer)}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={() => setShowSideDrawer(false)}
      />
      <main style={{ marginTop: "56px", minHeight: "calc(100vh - 86px)" }}>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
