import { useState } from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";

function SideBar() {
  const [sideVisible, setSideVisible] = useState(true);
  const isToggled = () => {
    if (sideVisible) {
      setSideVisible(false);
    } else {
      setSideVisible(true);
    }
  };
  return (
    <div>
      <div className="fixed z-50 top-0 left-0">
        <Hamburger onToggle={isToggled} size={24} />
      </div>
      <div className="fixed z-40 top-0 left-0">
        {" "}
        <Sidebar
          collapsed={sideVisible}
          className="sidebar"
          collapsedWidth="0"
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "#242424",
            },
          }}
        >
          <Menu
            menuItemStyles={{
              button: ({ level }) => {
                if (level === 0)
                  return {
                    color: "white",
                    backgroundColor: "#242424",
                  };
              },
            }}
          >
            <MenuItem> </MenuItem>
            <MenuItem component={<Link to="/saved" />}> Saved </MenuItem>
            <MenuItem component={<Link to="/" />}> Basketball </MenuItem>
            <MenuItem> Log In </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
}
export default SideBar;
