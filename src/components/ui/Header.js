import React, { useState, useEffect } from "react";

import {
	AppBar,
	Toolbar,
	useScrollTrigger,
	Typography,
	makeStyles,
	SwipeableDrawer,
	Tabs,
	Tab,
	Button,
	Menu,
	MenuItem,
	useMediaQuery,
	useTheme,
	IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { MenuOutlined } from "@material-ui/icons";
// for responsiveness

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
		marginBottom: "3em",
		[theme.breakpoints.down("md")]: {
			marginBottom: "2em"
		},
		[theme.breakpoints.down("xs")]: {
			marginBottom: "1.75em"
		}
	},
	logo: {
		height: "7em",
		[theme.breakpoints.down("md")]: {
			height: "6em"
		},
		[theme.breakpoints.down("xs")]: {
			height: "5.5em"
		}
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
	},
	menu: {
		backgroundColor: theme.palette.common.blue,
		color: theme.palette.common.white,
		borderRadius: "0px"
	},
	menuItem: {
		...theme.typography.tab,
		opacity: 0.7,
		"&:hover": {
			opacity: 1
		}
	},
	drawerIconContainer: {
		"&:hover": {
			backgroundColor: "transparent"
		},
		marginLeft: "auto"
	},
	drawerIcon: {
		width: "50px",
		height: "50px"
	}
}));

function Header() {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

	const [activeTab, setActiveTab] = useState(0);
	const handleTabChange = (e, value) => setActiveTab(value);

	//state for menu items
	const [anchorEle, setAnchorEle] = useState(null);
	const [openMenu, setOpenMenu] = useState(false);

	// state for submenu Items
	const [selectedIndex, setSelectedIndex] = useState(0);

	// state for drawers
	const [openDrawer, setOpenDrawer] = useState(false);

	const options = [
		{ name: "Services", to: "/services" },
		{ name: "Android Developemnt", to: "/android" },
		{ name: "IOT Solutions", to: "/iot" },
		{ name: "Website Solutions", to: "/websites" }
	];

	const handleClick = e => {
		setAnchorEle(e.currentTarget);
		setOpenMenu(true);
	};

	const handleClose = e => {
		setAnchorEle(null);
		setOpenMenu(false);
	};

	useEffect(() => {
		switch (window.location.pathname) {
			case "/":
				if (activeTab !== 0) setActiveTab(0);
				break;
			case "/services":
				if (activeTab !== 1) {
					setActiveTab(1);
					setSelectedIndex(0);
				}
				break;

			case "/android":
				if (activeTab !== 1) {
					setActiveTab(1);
					setSelectedIndex(1);
				}
				break;
			case "/iot":
				if (activeTab !== 1) {
					setActiveTab(1);
					setSelectedIndex(2);
				}
				break;
			case "/websites":
				if (activeTab !== 1) {
					setActiveTab(1);
					setSelectedIndex(3);
				}
				break;
			case "/contactus":
				if (activeTab !== 2) {
					setActiveTab(2);
				}
				break;

			default:
				break;
		}
	}, [activeTab]);

	const tabs = (
		<>
			<Tabs
				value={activeTab}
				className={classes.tabContainer}
				onChange={handleTabChange}
				indicatorColor='primary'
			>
				<Tab className={classes.tabs} label='Home' component={Link} to='/' />
				<Tab
					aria-owns={anchorEle ? "simple-menu" : undefined}
					aria-haspopup={anchorEle ? "true" : undefined}
					onMouseOver={e => handleClick(e)}
					className={classes.tabs}
					label='Services'
					component={Link}
					to='/services'
				/>
				<Tab
					className={classes.tabs}
					label='Contact us'
					component={Link}
					to='/contactus'
				/>
			</Tabs>
			<Button variant='contained' color='secondary' className={classes.button}>
				{" "}
				Free Estimate
			</Button>
			<Menu
				id='simple-menu'
				keepMounted
				open={openMenu}
				anchorEl={anchorEle}
				onClose={handleClose}
				MenuListProps={{ onMouseLeave: handleClose }}
				onClick={() => setActiveTab(1)}
				elevation={0}
				classes={{ paper: classes.menu }}
			>
				{options.map((menu, index) => (
					<MenuItem
						classes={{ root: classes.menuItem }}
						component={Link}
						to={menu.to}
						onClick={() => {
							setSelectedIndex(index);
							handleClose();
						}}
						selected={index === selectedIndex && activeTab === 1}
					>
						{menu.name}
					</MenuItem>
				))}
			</Menu>
		</>
	);

	const drawer = (
		<>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				OnOpen={() => setOpenDrawer(true)}
			>
				Example drawer
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple
			>
				<MenuOutlined className={classes.drawerIcon} />
			</IconButton>
		</>
	);

	return (
		<>
			<ElevationScroll>
				<AppBar>
					<Toolbar disableGutters>
						<Link to='/' onClick={() => setActiveTab(0)}>
							<img className={classes.logo} src={logo} alt='company logo' />
						</Link>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</>
	);
}
export default Header;
