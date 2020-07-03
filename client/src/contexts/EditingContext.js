import React, { createContext, useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const EditingContext = createContext()

export default EditingContext

export const EditingContextProvider = (props) => {
	const [editingState, setEditingState] = useState({})
	const [alertState, setAlertState] = useState({ 
		isShown: false, 
		message: '', 
		variant: 'danger' 
	})
	const [confirmationState, setConfirmationState] = useState({ 
		isShown: false, 
		message: '', 
		confirm: null,
		cancel: () => deleteConfirmation(),
	})
	
	
	/* 
	 * Alerts
	 * messages only, errors or successes
	 */
	
	const setEditingErrorMessage = (message) => {
		setAlertState({ message, isShown: true, variant: 'danger' })
	}
	
	const setEditingSuccessMessage = (message) => {
		setAlertState({ message, isShown: true, variant: 'primary' })
	}
	
	useEffect( () => {
		const timer = setTimeout(() => {
			setAlertState({ isShown: false, message: '' })
		}, 3000);
		return () => clearTimeout(timer);
	}, [alertState])
	
	const isEditing = () => {
		return Object.values(editingState).some( e => e )
	}
	
	const setNotEditing = () => 
		setEditingState( Object.keys(editingState).reduce( (a,k) => a = {...a, [k]:false}, {} ) )
	
	
	
	/*
	 * Confirmations
	 * must confirm/cancel action
	 */
	const setConfirmation = (message, confirm) => {
		setAlertState({
			...confirmationState,
			isShown: true,
			message, 
			confirm, 
		})
	}
	
	const deleteConfirmation = () => setAlertState({
		...confirmationState, 
		isShown: false,
		message: '', 
		confirm: null, 
	})
	
	
	/*
	 * Render Alerts and Confirmations
	 */
	const renderAlert = () => {
		return (
			<Alert variant={alertState.variant} show={alertState.isShown}>
				{alertState.message}
			</Alert>
		)
	}
	
	const renderConfirmation = () => {
		return (
			<Alert show={alertState.isShown} variant="warning">
				<Alert.Heading>Warning</Alert.Heading>
				<p>{alertState.message}</p>
				<hr />
				<div className="d-flex justify-content-end">
					<Button onClick={() => alertState.cancel()} variant="outline-primary" className="mr-2">
						Cancel
					</Button>
					<Button onClick={() => alertState.confirm()} variant="danger">
						Confirm
					</Button>
				</div>
			</Alert>
		)
	}
	
	
	
	return(
		<>
			<EditingContext.Provider value={{
				isEditing, editingState, setEditingState, setNotEditing,
				setEditingErrorMessage, setEditingSuccessMessage, 
				setConfirmation, deleteConfirmation,
			}}>
				{ props.children }
			</EditingContext.Provider>
			{renderAlert()}
			{renderConfirmation()}
		</>
	)
}