import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul>
    {props.isAuthenticated ? (
      <>
        <NavigationItem link="/additem">Add Item</NavigationItem>
        <NavigationItem link="/myitems">My Items</NavigationItem>
      </>
    ) : null}
    <NavigationItem link="/">Market</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);
export default navigationItems;
