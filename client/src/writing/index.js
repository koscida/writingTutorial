import React from 'react';
import { AppContextProvider } from './contexts/AppContext'
import Writing from './views/Writing'

import '../styles/styles.scss'

export default function App() {
	return(
		<AppContextProvider>
			<Writing />
		</AppContextProvider>
	)
}