import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../contexts/AppContext'
import EditingContext from '../contexts/EditingContext'
import Button from 'react-bootstrap/Button'
import Form  from 'react-bootstrap/Form'

const ChapterMetaForm = ({context}) => {
	const { selectedChapterData, onChapterCreate, onChapterMetaSave } = useContext(AppContext)
	const { editingState, setEditingState } = useContext(EditingContext)
	const [chapterData, setChapterData] = useState({
		...selectedChapterData,
		id: selectedChapterData ? selectedChapterData.id : '',
		name: selectedChapterData ? selectedChapterData.name : '',
		description: selectedChapterData ? selectedChapterData.description : '',
	})
	
	// useEffect( () => {
	// 	setChapterData({
	// 		id : '',
	// 		name : '',
	// 		description : ''
	// 	})
	// }, [editingState])
	
	const handleSubmit = () => {
		context === 'create'
			? onChapterCreate(chapterData)
			: onChapterMetaSave(chapterData)
	}
	
	const handleChange = name => e => {
		setChapterData({
			...chapterData,
			[name]: e.target.value
		})
	}
	
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formChapterName">
					<Form.Label>Name</Form.Label>
					<Form.Control 
						required
						type="text" 
						name="name"
						value={chapterData.name}
						onChange={handleChange("name")} 
						placeholder="Enter name" 
					/>
					<Form.Text className="text-muted">
						Chapters are automatically prefixed with chapter numbers
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="formChapterDescription">
					<Form.Label>Description</Form.Label>
					<Form.Control 
						as="textarea" 
						rows="4" 
						name="description"
						value={chapterData.description}
						onChange={handleChange("description")} 
						placeholder="Enter description" 
					/>
				</Form.Group>
				
				<Button 
					variant="primary" 
					onClick={handleSubmit}
					disabled={!chapterData.name}
					className="mr-sm-2"
				>Save</Button>
				<Button 
					variant="outline-danger" 
					onClick={ () => (context==='create')
						? setEditingState({...editingState, createChapter: false}) 
						: setEditingState({...editingState, meta: false}) 
					}
				>Cancel</Button>
			</Form>
		</>
	)
}

export default ChapterMetaForm