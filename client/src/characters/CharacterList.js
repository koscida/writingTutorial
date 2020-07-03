import React, { useContext } from 'react'
import CharacterContext from '../contexts/CharacterContext'
import EditingContext from '../contexts/EditingContext'
import CharacterEdit from './CharacterEdit'
import GroupEdit from './GroupEdit'

function CharacterList(props) {
	const { characters, selectedCharacterData, onCharacterSelect } = useContext(CharacterContext)
	const { isEditing, setEditingErrorMessage } = useContext(EditingContext)
	
	const handleCharacterSelect = (id) => {
		if(isEditing()) setEditingErrorMessage("Save before switching characters")
		else onCharacterSelect(id)
	}
	
	return (
		<>
			<div id="sidebarHeader" className="p-sm-2">
				{/* <AddChapter />
				<AddSection /> */}
			</div>
			<div id="sidebarContent">
				
				<div id="chapterList">
					<ul key={'test'}>
						{characters.map( ({id, name}, idx) => {
							return (
								<React.Fragment key={id}>
									<li 
										key={id} 
										onClick={() => handleCharacterSelect(id)}
										className={(selectedCharacterData && selectedCharacterData.id===id) ? 'active' : ''}
									>
										{idx+1}. {name}
									</li>
								</React.Fragment>
							)
						})}
					</ul>
				</div>
				
			</div>
		</>
	)
}

export default CharacterList