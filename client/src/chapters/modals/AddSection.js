import React, { useContext } from 'react'
import EditingContext from '../../contexts/EditingContext'
import SectionMetaForm from '../forms/SectionMetaForm'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'
	
const AddSection = () => {
	const { isEditing, editingState, setEditingState, setEditingErrorMessage } = useContext(EditingContext)
	
	const handleToggle = () => {
		if (isEditing()) setEditingErrorMessage("Cannot create section when editing. Save content first.")
		else setEditingState({...editingState, createSection: !editingState.createSection})
	}
	
	return (
		<>
			<Button 
				variant="light" 
				onClick={handleToggle}
				size="sm"
			>New Section</Button>
			<Modal 
				show={editingState.createSection} 
				onHide={() => setEditingState({...editingState, createSection: false})}
			>
				<Modal.Header closeButton>
					<Modal.Title>Create New Section</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<SectionMetaForm context='create' />
				</Modal.Body>
			</Modal>
			
		</>
	)
}

export default AddSection