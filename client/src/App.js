import React from 'react';
import { Switch, Route } from "react-router-dom";

import { ChapterContextProvider } from './contexts/ChapterContext'
import { EditingContextProvider } from './contexts/EditingContext'
import { CharacterContextProvider } from './contexts/CharacterContext'

import Home from './base/Home'
import TopNav from './base/TopNav'
import Error from './base/Error'
import Chapters from './chapters/Chapters'
import Characters from './characters/Characters'
import Themes from './themes/Themes'

function App() {
	return (
		<div id="container">
		
			<div id="topNav">
				<TopNav />
			</div>
			
			<div id="content">
				<EditingContextProvider>
					<ChapterContextProvider>
						<CharacterContextProvider>
						
							<Switch>
								<Route path="/" exact component={Home} />
								<Route path="/chapters" component={Chapters} />
								<Route path="/characters" component={Characters} />
								<Route path="/themes" component={Themes} />
								<Route component={Error} />
							</Switch>
							
						</CharacterContextProvider>
					</ChapterContextProvider>
				</EditingContextProvider>
			</div>
			
		</div>
	);
}

export default App;
