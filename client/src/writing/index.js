import React from 'react';
import { AppContextProvider } from './contexts/AppContext'
import { EditingContextProvider } from './contexts/EditingContext'
import Writing from './views/Writing'

import '../styles/styles.scss'

export default function App() {
	return(
		<AppContextProvider>
			<EditingContextProvider>
				<Writing />
			</EditingContextProvider>
		</AppContextProvider>
	)
}