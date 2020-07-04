import React, { useContext, useState } from 'react'
import CharacterContext from '../contexts/CharacterContext'
import EditingContext from '../contexts/EditingContext'
import AddCharacter from './AddCharacter'
import AddGroup from './AddGroup'

import Form from 'react-bootstrap/Form'
import { CaretDownFill } from 'react-bootstrap-icons';

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
		<div id="sidebarContent">
			<div id="listFilter">
				<div className="filter">
					<div className="filterBtn" onClick={() => setFilterState(!filterState)}>
						Group <CaretDownFill />
					</div>
					{filterState
						? <div className="filterBox">
							{groups.map( group => 
								<Form.Group controlId={"filterCheckbox"+group.id}>
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
			<div id="listAdd">
				<AddCharacter />
				<AddGroup />
			</div>
		</div>
	)
}

export default CharacterList