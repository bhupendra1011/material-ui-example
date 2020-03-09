import React from "react";
import Header from "./ui/Header";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./ui/theme";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path='/' component={() => <div>Home</div>} />
					<Route exact path='/services' component={() => <div>Services</div>} />
					<Route
						exact
						path='/contactus'
						component={() => <div>Contact us</div>}
					/>
					<Route
						exact
						path='/android'
						component={() => <div>Android Development Projects</div>}
					/>
					<Route exact path='/iot' component={() => <div>IOT Projects</div>} />
					<Route
						exact
						path='/websites'
						component={() => <div>Website Development</div>}
					/>
				</Switch>
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
