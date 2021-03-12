import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.module.scss";

const SideDrawer = (props) => (
  <>
    <Backdrop show={props.open} clicked={props.closed} />
    <div
      className={
        props.open
          ? [classes.SideDrawer, classes.Open].join(" ")
          : [classes.SideDrawer, classes.Close].join(" ")
      }
      onClick={props.closed}
    >
      <nav>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </div>
  </>
);

export default SideDrawer;
