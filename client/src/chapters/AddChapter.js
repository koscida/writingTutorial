import React, { useContext } from 'react'
import EditingContext from '../contexts/EditingContext'
import ChapterMetaForm from './ChapterMetaForm'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'

const AddChapter = () => {
	const { isEditing, editingState, setEditingState, setEditingErrorMessage } = useContext(EditingContext)
	
	const handleToggle = () => {
		if (isEditing()) setEditingErrorMessage("Cannot create chapter when editing. Save content first.")
		else setEditingState({create: !editingState.create})
	}
	
	return (
		<>
			<Button 
				variant="light" 
				onClick={handleToggle} 
				size="sm"
				className="mr-sm-2"
			>New Chapter</Button>
			
			<Modal 
				show={editingState.create} 
				onHide={() => setEditingState({create: true})}
			>
				<Modal.Header closeButton>
					<Modal.Title>Create New Chapter</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ChapterMetaForm context='create' />
				</Modal.Body>
			</Modal>
		</>
	)
}

export default AddChapter