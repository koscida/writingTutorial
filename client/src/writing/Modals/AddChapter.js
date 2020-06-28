import React, { useContext, useState } from 'react'
import AppContext from '../contexts/AppContext'
import EditingContext from '../contexts/EditingContext'
import ChapterMetaForm from '../forms/ChapterMetaForm'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'

const AddChapter = () => {
	const [show, setShow] = useState(false)
	const { onChapterCreate } = useContext(AppContext)
	const { isEditing, setIsEditing } = useContext(EditingContext)
	
	const handleToggle = () => {
		setIsEditing(!show)
		setShow(!show)
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
			
			<Modal show={show} onHide={handleToggle}>
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