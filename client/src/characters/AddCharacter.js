import React, { useContext } from 'react'
import EditingContext from '../contexts/EditingContext'
import EditCharacter from './EditCharacter'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'

const AddCharacter = () => {
	const { isEditing, editingState, setEditingState, setNotEditing, setEditingErrorMessage } = useContext(EditingContext)
	
	const handleToggle = () => {
		if (isEditing()) setEditingErrorMessage("Cannot create character when editing. Save content first.")
		else setEditingState({...editingState, createCharacter: !editingState.createCharacter})
	}
	
	return (
		<>
			<Button 
				variant="light" 
				onClick={handleToggle} 
				size="sm"
				className="mr-sm-2 mb-sm-2"
			>New Character</Button>
			
			<Modal 
				show={editingState.createCharacter} 
				onHide={() => setNotEditing()}
			>
				<Modal.Header closeButton>
					<Modal.Title>Create New Character</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditCharacter context='create' />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default AddCharacter