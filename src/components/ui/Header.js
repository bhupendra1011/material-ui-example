import React from "react";

import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Typography,
  makeStyles
} from "@material-ui/core";

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
    ...theme.mixins.toolbar
  }
}));

function Header() {
  const classes = useStyles();
  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h3">Material UI demo</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
export default Header;
