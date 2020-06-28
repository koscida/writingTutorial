import React, { useContext, useState } from 'react'
import AppContext from '../contexts/AppContext'
import EditingContext from '../contexts/EditingContext'
import ChapterMetaForm from '../forms/ChapterMetaForm'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'

const AddChapter = () => {
	const [isShown, setIsShown] = useState(false)
	const { onChapterCreate } = useContext(AppContext)
	const { isEditing, setIsEditing, setEditingErrorMessage } = useContext(EditingContext)
	
	const handleToggle = () => {
		if (isEditing && !isShown) {
			setEditingErrorMessage("Cannot create chapter when editing. Save content first.")
		} else {
			// Forces state
			setIsEditing(!isShown)
			setIsShown(!isShown)
		}
	}
	
	const handleCreate = values => {
		handleToggle()
		onChapterCreate(values)
		// console.log(values)
	}
	
	return (
		<>
			<Button 
				variant="light" 
				onClick={handleToggle} 
				size="sm"
				className="mr-sm-2"
			>New Chapter</Button>
			
			<Modal show={isShown} onHide={handleToggle}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Chapter</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ChapterMetaForm 
						onSave={handleCreate}
						onCancel={handleToggle}
					/>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default AddChapter