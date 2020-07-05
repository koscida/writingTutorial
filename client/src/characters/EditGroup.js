import React, { useContext, useEffect, useState } from 'react'
import ChapterContext from '../contexts/ChapterContext'
import EditingContext from '../contexts/EditingContext'
import Button from 'react-bootstrap/Button'
import Form  from 'react-bootstrap/Form'

const EditGroup = ({context}) => {
	const { selectedChapterData, onChapterCreate, onChapterUpdate } = useContext(ChapterContext)
	const { setNotEditing, editingState } = useContext(EditingContext)
	const [chapterData, setChapterData] = useState({
		...selectedChapterData,
		id: selectedChapterData ? selectedChapterData.id : '',
		name: selectedChapterData ? selectedChapterData.name : '',
		description: selectedChapterData ? selectedChapterData.description : '',
	})
	
	const handleSubmit = () => {
		context === 'create'
			? onChapterCreate(chapterData)
			: onChapterUpdate(chapterData)
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
					onClick={ () => setNotEditing() }
				>Cancel</Button>
			</Form>
		</>
	)
}

export default EditGroup