import React, { createContext, useState, useContext } from 'react';
import EditingContext from './EditingContext'

const CharacterContext = createContext();

export default CharacterContext;

export const CharacterContextProvider = (props) => {
	const { setNotEditing, setEditingErrorMessage, setEditingSuccessMessage, deleteConfirmation } = useContext(EditingContext)
	
	const [characters, setCharacters] = useState([])
	const [groups, setGroups] = useState([])
	const [selectedCharacterData, setSelectedCharacterData] = useState(null)
	
	
	/*
	 * Select/get functions
	 */
	const getCharacters = () => {
		// TODO: check for ok status codes, assumes 200 rn
		fetch('http://localhost:5000/character/list')
		.then(response => {
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			//console.log(data)
			setCharacters(data)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not get characters.")
		})
	}
	
	const onCharacterSelect = (id) => {
		fetch(`http://localhost:5000/character/${id}`)
		.then(response => {
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			//console.log(data)
			setSelectedCharacterData(data[0])
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not get character.")
		})
	}
	
	const getGroups = () => {
		fetch('http://localhost:5000/character/groups')
		.then(response => {
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			// console.log(data)
			setGroups(data)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not get characters.")
		})
	}
	
	
	/*
	 * Character functions
	 */
	const onCharacterCreate = newCharacter => {
		
	}
	
	const onCharacterUpdate = updatedCharacter => {
		
	}
	 
	 
	 
	/*
	 * Group Functions
	 */
	const onGroupCreate = newGroup => {
		
	}
	
	const onGroupUpdate = updatedGroup => {
		
	}
	
	
	return (
		<>
			<CharacterContext.Provider value={{ 
				characters, getCharacters,
				groups, getGroups, 
				selectedCharacterData, onCharacterSelect, onCharacterCreate, onCharacterUpdate,
				onGroupCreate, onGroupUpdate,
			}}>
				{ props.children }
			</CharacterContext.Provider>
		</>
	)
}