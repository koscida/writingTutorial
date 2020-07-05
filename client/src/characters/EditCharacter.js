import React, { useContext, useEffect, useState } from 'react'
import CharacterContext from '../contexts/CharacterContext'
import EditingContext from '../contexts/EditingContext'

import Form  from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EditCharacter = ({context}) => {
	const { 
		groups,
		selectedCharacterData, onCharacterCreate, onCharacterUpdate 
	} = useContext(CharacterContext)
	const { setNotEditing, editingState } = useContext(EditingContext)
	const [characterData, setCharacterData] = useState({
		...selectedCharacterData,
		name: selectedCharacterData ? selectedCharacterData.name : '',
		headline: selectedCharacterData ? selectedCharacterData.headline : '',
		summary: selectedCharacterData ? selectedCharacterData.summary : '',
		groups: selectedCharacterData ? selectedCharacterData.groups : [],
	})
	
	const handleSubmit = () => {
		context === 'create'
			? onCharacterCreate(characterData)
			: onCharacterUpdate(characterData)
	}
	
	const handleChange = e => {
		setCharacterData({
			...characterData,
			[e.target.name]: e.target.value
		})
	}
	
	const handleGroupSelect = e => {
		const id = parseInt(e.target.value);
		const isChecked = e.target.checked;
		console.log(id, isChecked);
		(isChecked) 
			? setCharacterData({...characterData, groups: [...characterData.groups, id]})
			: setCharacterData({...characterData, groups: characterData.groups.filter(g => g !== id)})
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
						value={characterData.name}
						onChange={handleChange} 
						placeholder="Enter name" 
					/>
				</Form.Group>
				<Form.Group controlId="formChapterHeadline">
					<Form.Label>Headline</Form.Label>
					<Form.Control 
						as="textarea" 
						rows="2" 
						name="headline"
						value={characterData.headline}
						onChange={handleChange} 
						placeholder="Enter headline" 
					/>
				</Form.Group>
				<Form.Group controlId="formChapterSummary">
					<Form.Label>Summary</Form.Label>
					<Form.Control 
						as="textarea" 
						rows="4" 
						name="summary"
						value={characterData.summary}
						onChange={handleChange} 
						placeholder="Enter summary" 
					/>
				</Form.Group>
				<Form.Group controlId="formChapterSummary">
					<Form.Label>Groups</Form.Label> <br/>
					{groups.map( group => 
						<div className="form-check form-check-inline" key={group.id}>
							<input 
								type="checkbox" 
								id={"filterCheckbox"+group.id}
								className="form-check-input" 
								value={group.id} 
								checked={characterData.groups.includes(group.id)}
								onChange={handleGroupSelect}
							/>
							<label 
								htmlFor={"filterCheckbox"+group.id} 
								className="form-check-label"
							>{group.name}</label>
						</div>
					)}
				</Form.Group>
				
				<Button 
					variant="primary" 
					onClick={handleSubmit}
					disabled={!characterData.name}
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

export default EditCharacter