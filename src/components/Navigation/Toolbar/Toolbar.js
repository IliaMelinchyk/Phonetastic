import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
  <header>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <nav>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);
export default toolbar;
