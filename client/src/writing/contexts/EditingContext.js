import React, { createContext, useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

const EditingContext = createContext()

export default EditingContext

export const EditingContextProvider = (props) => {
	const [editingState, setEditingState] = useState({
		text: false,
		meta: false
	})
	const [alertState, setAlertState] = useState({ 
		isShown: false, 
		message: 'this show not be shown', 
		variant: 'danger' 
	})
	
	const renderAlert = () => {
		return (
			<Alert variant={alertState.variant} show={alertState.isShown}>
				{alertState.message}
			</Alert>
		)
	}
	
	const setErrorAlert = (message) => {
		setAlertState({ message, isShown: true, variant: 'danger' })
	}
	
	const setSuccessAlert = (message) => {
		setAlertState({ message, isShown: true, variant: 'primary' })
	}
	
	useEffect( () => {
		const timer = setTimeout(() => {
			setAlertState({ isShown: false, message: 'this show not be shown' })
		}, 3000);
		return () => clearTimeout(timer);
	}, [alertState])
	
	const isEditing = () => {
		return Object.values(editingState).some( e => e )
	}
	
	return(
		<>
		<EditingContext.Provider value={{
			isEditing, editingState, setEditingState,
			setEditingErrorMessage: setErrorAlert,
			setEditingSuccessMessage: setSuccessAlert
		}}>
			{ props.children }
		</EditingContext.Provider>
		{renderAlert()}
		</>
	)
}