import React from 'react';
import { ChapterContextProvider } from './contexts/ChapterContext'
import { EditingContextProvider } from './contexts/EditingContext'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './base/Home'
import TopNav from './base/TopNav'
import Error from './base/Error'
import Chapters from './chapters/Chapters'
import Characters from './characters/Characters'
import Themes from './themes/Themes'

import './styles/styles.scss'

function App() {
	return (
		<EditingContextProvider>
			<ChapterContextProvider>
				<div id="writingContainer">
				
					<div id="writingTopNav">
						<TopNav />
					</div>
					
					<div id="writingContent">
						<Router>
							<Switch>
								<Route path="/" exact component={Home} />
								<Route path="/chapters" component={Chapters} />
								<Route path="/characters" component={Characters} />
								<Route path="/themes" component={Themes} />
								<Route component={Error} />
							</Switch>
						</Router>
					</div>
					
				</div>
			</ChapterContextProvider>
		</EditingContextProvider>
	);
}

export default App;
