import React, { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  makeStyles,
  Tabs,
  Tab,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em"
  },
  logo: {
    height: "7em"
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tabs: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    height: "45px",
    marginRight: "25px",
    marginLeft: "50px"
  }
}));

function Header() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (e, value) => setActiveTab(value);

  useEffect(() => {
    if (window.location.pathname === "/" && activeTab !== 0) setActiveTab(0);
    else if (window.location.pathname === "/services" && activeTab !== 1)
      setActiveTab(1);
    else if (window.location.pathname === "/contactus" && activeTab !== 2)
      setActiveTab(2);
    else {
    }
  }, [activeTab]);
  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar disableGutters>
            <Link to="/" onClick={() => setActiveTab(0)}>
              <img className={classes.logo} src={logo} alt="company logo" />
            </Link>
            <Tabs
              value={activeTab}
              className={classes.tabContainer}
              onChange={handleTabChange}
              indicatorColor="primary"
            >
              <Tab
                className={classes.tabs}
                label="Home"
                component={Link}
                to="/"
              />
              <Tab
                className={classes.tabs}
                label="Services"
                component={Link}
                to="/services"
              />
              <Tab
                className={classes.tabs}
                label="Contact us"
                component={Link}
                to="/contactus"
              />
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              {" "}
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
export default Header;
