import React, { useContext, useState, useEffect } from 'react'
import AppContext from '../contexts/AppContext'
import EditingContext from '../contexts/EditingContext'
import Button from 'react-bootstrap/Button'
import Form  from 'react-bootstrap/Form'

const SectionMetaForm = ({context}) => {
	const { chapters, selectedSectionData, onSectionCreate, onSectionMetaSave } = useContext(AppContext)
	const { editingState, setEditingState } = useContext(EditingContext)
	const [sectionData, setSectionData] = useState({
		...selectedSectionData,
		id: selectedSectionData ? selectedSectionData.id : '',
		name: selectedSectionData ? selectedSectionData.name : '',
		description: selectedSectionData ? selectedSectionData.description : '',
		chapterId: selectedSectionData ? selectedSectionData.chapterId : '',
	})
	
	// useEffect( () => {
	// 	setSectionData({
	// 		id : '',
	// 		name : '',
	// 		description : '',
	// 		chapterId : '',
	// 	})
	// }, [editingState])
	
	const handleSubmit = () => {
		context === 'create'
			? onSectionCreate(sectionData)
			: onSectionMetaSave(sectionData)
	}
	
	const handleChange = e => {
		setSectionData({
			...sectionData,
			[e.target.name]: e.target.value
		})
	}
	
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formSectionName">
					<Form.Label>Name</Form.Label>
					<Form.Control 
						required
						type="text" 
						name="name"
						value={sectionData.name}
						onChange={handleChange}
						placeholder="Enter name" 
					/>
				</Form.Group>
				<Form.Group controlId="formSectionChapter">
					<Form.Label>Chapter</Form.Label>
					<Form.Control 
						required
						as="select" 
						name="chapterId"
						value={sectionData.chapterId}
						onChange={handleChange}
					>
						<option>Select chapter...</option>
						{ chapters.map( ({id, name}) => <option key={id} value={id}>{name}</option> ) }
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="formSectionDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control 
						as="textarea" 
						rows="4" 
						name="description"
						value={sectionData.description}
						onChange={handleChange} 
						placeholder="Enter description" 
					/>
				</Form.Group>
				
				<Button 
					variant="primary" 
					onClick={handleSubmit}
					disabled={!sectionData.name || !sectionData.chapterId}
					className="mr-sm-2"
				>Save</Button>
				<Button 
					variant="outline-danger" 
					onClick={ () => (context==='create')
						? setEditingState({...editingState, createSection: false}) 
						: setEditingState({...editingState, meta: false}) 
					}
				>Cancel</Button>
			</Form>
		</>
	)
}

export default SectionMetaForm