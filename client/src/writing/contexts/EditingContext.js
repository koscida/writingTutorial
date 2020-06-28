import React, { createContext, useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

const EditingContext = createContext()

export default EditingContext

export const EditingContextProvider = (props) => {
	const [isEditing, setIsEditing] = useState(false)
	const [alertState, setAlertState] = useState({ isShown: false, message: 'this show not be shown' })
	
	const renderAlert = () => {
		return (
			<Alert variant='danger' show={alertState.isShown}>
				{alertState.message}
			</Alert>
		)
	}
	
	const setAlert = (message) => {
		setAlertState({message, isShown: true})
	}
	
	useEffect( () => {
		const timer = setTimeout(() => {
			setAlertState({ isShown: false, message: 'this show not be shown' })
		}, 3000);
		return () => clearTimeout(timer);
	}, [alertState])
	
	return(
		<>
		<EditingContext.Provider value={{
			isEditing, setIsEditing,
			setEditingErrorMessage: setAlert
		}}>
			{ props.children }
		</EditingContext.Provider>
		{renderAlert()}
		</>
	)
}