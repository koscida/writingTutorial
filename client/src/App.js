import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './base/Home'
import Error from './base/Error'
import Products from './tutorials/Products'
import Writing from './writing/Writing'


function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/products" exact component={Products} />
				<Route path="/writing" component={Writing} />
				<Route component={Error} />
			</Switch>
		</Router>
	);
}

export default App;
