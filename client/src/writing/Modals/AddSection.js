import React, { useContext, useState } from 'react'
import AppContext from '../contexts/AppContext'
import EditingContext from '../contexts/EditingContext'
import SectionMetaForm from '../forms/SectionMetaForm'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'
	
const AddSection = () => {
	const [show, setShow] = useState(false)
	const { onSectionCreate } = useContext(AppContext)
	const { isEditing, setIsEditing } = useContext(EditingContext)
	
	const handleToggle = () => {
		setIsEditing(!show)
		setShow(!show)
	}
	
	const handleCreate = values => {
		handleToggle()
		onSectionCreate(values)
	}
	
	return (
		<>
			<Button 
				variant="light" 
				onClick={handleToggle}
				size="sm"
			>New Section</Button>
			<Modal show={show} onHide={handleToggle}>
				<Modal.Header closeButton>
					<Modal.Title>Create New Section</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<SectionMetaForm
						onSave={handleCreate}
						onCancel={handleToggle}
					/>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default AddSection