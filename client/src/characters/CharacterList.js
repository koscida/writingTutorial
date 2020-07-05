import React, { useContext, useState, useEffect } from 'react'
import CharacterContext from '../contexts/CharacterContext'
import EditingContext from '../contexts/EditingContext'
import AddCharacter from './AddCharacter'
import AddGroup from './AddGroup'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { CaretDownFill as ArrowIcon, XCircleFill as CancelIcon } from 'react-bootstrap-icons';

const CharacterList = () => {
	const { 
		characters, selectedCharacterData, onCharacterSelect,
		groups,
	} = useContext(CharacterContext)
	const { isEditing, setEditingErrorMessage } = useContext(EditingContext)
	const [filterState, setFilterState] = useState({
		group: {
			show: false,
			active: false,
			ids: {}
		}
	})
	
	useEffect( () => {
		setFilterState({
			...filterState,
			group: {
				...filterState.group,
				ids: groups.reduce( (a,g) => {
					a = {...a,[g.id]:false}
					return a
				}, {})
			}
		})
	}, [groups])
	
	
	
	const handleCharacterSelect = (id) => {
		if(isEditing()) setEditingErrorMessage("Save before switching characters")
		else onCharacterSelect(id)
	}
	
	/*
	 * Filters
	 */
	const toggleGroupFilter = () => {
		setFilterState({
			...filterState, 
			group:{
				...filterState.group, 
				show: !filterState.group.show
			}
		})
	}
	
	const handleGroupFilterSelect = e => {
		let newIDs = {
			...filterState.group.ids, 
			[e.target.value] : !filterState.group.ids[e.target.value]
		}
		let newActive = !Object.values(newIDs).every(id => !id)
		setFilterState({
			...filterState, 
			group:{
				...filterState.group, 
				active: newActive,
				ids: newIDs
			}
		})
	}
	
	const clearGroupFilter = () => {
		setFilterState({
			...filterState,
			group: {
				show: false,
				active: false,
				ids: groups.reduce( (a,g) => {
					a = {...a,[g.id]:false}
					return a
				}, {})
			}
		})
	}
	
	const filteredCharacters = () => {
		return characters.filter( character => {
			let activeFilterCount = 0
			let charFilterCount = 0
			Object.entries(filterState).forEach( ([filterType, filterData]) => {
				if(filterData.active) {
					if(filterType === "group") {
						Object.entries(filterData.ids).forEach( ([id, idFilter]) => {
							if(idFilter) {
								activeFilterCount++
								if(character.groupIds.includes(parseInt(id))) 
									charFilterCount++
							}
						})
					}
				}
			})
			return (activeFilterCount === charFilterCount)
		})
	}
	
	return (
		<div id="sidebarContent">
			<div id="listFilter">
				<div className="filter">
					<div className="filterBtn" onClick={toggleGroupFilter}>
						Group <span>{filterState.group.show?<CancelIcon />:<ArrowIcon />}</span>
					</div>
					{filterState.group.show
						? <div className="filterBox">
								{groups.map( group => 
									<Form.Group controlId={"filterCheckbox"+group.id} key={group.id}>
										<div className="form-check">
											<input 
												type="checkbox" 
												id={"filterCheckbox"+group.id}
												className="form-check-input" 
												value={group.id} 
												checked={filterState.group.ids[group.id] || false}
												onChange={handleGroupFilterSelect}
											/>
											<label 
												htmlFor={"filterCheckbox"+group.id} 
												className="form-check-label"
											>{group.name}</label>
										</div>
									</Form.Group>
								)}
								<Button onClick={clearGroupFilter} size="sm" className="mr-sm-2 mb-sm-2">Clear</Button>
								<Button onClick={toggleGroupFilter} size="sm" className="mr-sm-2 mb-sm-2">Apply</Button>
							</div>
						: null
					}
				</div>
			</div>
			<div id="list">
				<ul>
					{filteredCharacters()
						.map( ({id, name}, idx) => {
							return (
								<li 
									key={id} 
									onClick={() => handleCharacterSelect(id)}
									className={(selectedCharacterData && selectedCharacterData.id===id) ? 'active' : ''}
								>{name}</li>
							)
						})
					}
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