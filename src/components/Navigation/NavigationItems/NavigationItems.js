import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.scss";

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {props.isAuthenticated ? (
      <>
        <NavigationItem link="/additem">Sell</NavigationItem>
        <NavigationItem link="/myitems">My phones</NavigationItem>
      </>
    ) : null}
    <NavigationItem link="/">Market</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Login</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
