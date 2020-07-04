import React, { useContext, useState } from 'react'
import CharacterContext from '../contexts/CharacterContext'
import EditingContext from '../contexts/EditingContext'
import CharacterEdit from './CharacterEdit'
import GroupEdit from './GroupEdit'

import Form from 'react-bootstrap/Form'

function CharacterList(props) {
	const { 
		characters, selectedCharacterData, onCharacterSelect,
		groups,
	} = useContext(CharacterContext)
	const { isEditing, setEditingErrorMessage } = useContext(EditingContext)
	const [filterState, setFilterState] = useState(false)
	
	
	const handleCharacterSelect = (id) => {
		if(isEditing()) setEditingErrorMessage("Save before switching characters")
		else onCharacterSelect(id)
	}
	
	return (
		<>
		<div id="listFilter">
			<div className="filter">
				<p className="filterBtn" onClick={() => setFilterState(!filterState)}>Group</p>
				{filterState
					? <div className="filterBox">
						{groups.map( group => 
							<Form.Group controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label={group.name} />
							</Form.Group>
						)}
					</div>
					: null
				}
			</div>
		</div>
		<div id="list">
			<ul>
				{characters.map( ({id, name}, idx) => {
					return (
						<li 
							key={id} 
							onClick={() => handleCharacterSelect(id)}
							className={(selectedCharacterData && selectedCharacterData.id===id) ? 'active' : ''}
						>{name}</li>
					)
				})}
			</ul>
		</div>
		</>
	)
}

export default CharacterList