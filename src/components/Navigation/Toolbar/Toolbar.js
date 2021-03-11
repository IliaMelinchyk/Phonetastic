import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { SiAdobephonegap } from "react-icons/si";
import classes from "./Toolbar.module.scss";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <SiAdobephonegap className={classes.Logo} />
    <div className={classes.Header}>
      <h3 className={[classes.Black, classes.Subheader].join(" ")}>
        Sell your phone&nbsp;
      </h3>
      <h1 className={classes.Black}>
        Phone<span className={classes.White}>tastic!</span>
      </h1>
      <h3 className={[classes.White, classes.Subheader].join(" ")}>
        &nbsp;Buy another
      </h3>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
    <DrawerToggle clicked={props.drawerToggleClicked} />
  </header>
);
export default toolbar;
