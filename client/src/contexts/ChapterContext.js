import React, { createContext, useState, useContext } from 'react';
import EditingContext from './EditingContext'

const ChapterContext = createContext();

export default ChapterContext;

export const ChapterContextProvider = (props) => {
	const { setNotEditing, setEditingErrorMessage, setEditingSuccessMessage, deleteConfirmation } = useContext(EditingContext)
	
	const [chapters, setChapters] = useState([])
	const [selectedChapterData, setSelectedChapterData] = useState(null)
	
	
	
	/*
	 * Select/get functions
	 */
	const getChapters = () => {
		// TODO: check for ok status codes, assumes 200 rn
		fetch('http://localhost:5000/chapter/list')
		.then(response => {
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			//console.log(data)
			setChapters(data)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not get chapters or sections.")
		})
	}
	
	const onChapterSelect = id => {
		fetch(`http://localhost:5000/chapter/${id}`)
		.then(response => {
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			// console.log(data)
			setSelectedChapterData(data[0])
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not select chapter.")
		})
	}
	
	
	/*
	 * Chapter functions
	 */
	const onChapterCreate = ({name, description}) => {
		// TODO: check for ok status codes, assumes 200 rn
		fetch(`http://localhost:5000/chapter/add?
			name=${name}&
			description=${description}&
			order=${chapters[chapters.length-1].order + 1}
		`)
		.then(response => {
			// console.log("response", response)
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		}).then(results => {
			let {data} = results
			// console.log(results)
			setNotEditing()
			setEditingSuccessMessage("Chapter created!")
			deleteConfirmation()
			
			getChapters()
			onChapterSelect(data.insertId)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not create section. (1)")
		})
		
	}
	
	const onChapterDelete = toDeleteChapterData => {
		const { id } = toDeleteChapterData
		fetch(`http://localhost:5000/chapter/delete?
			id=${id}
		`)
		.then(response => {
			//console.log(response)
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			// console.log(data)
			setNotEditing()
			setEditingSuccessMessage("Chapter deleted!")
			deleteConfirmation()
			
			getChapters()
			setSelectedChapterData(null)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not save data.")
		})
	}
	
	const onChapterUpdate = values => {
		const { id } = values
		let UPDATE_QUERY = `http://localhost:5000/chapter/update?`
		Object.entries(values).forEach( ([key, value]) =>  UPDATE_QUERY += `${key}=${value}&` )
		UPDATE_QUERY = UPDATE_QUERY.slice(0, -1)
		// console.log(UPDATE_QUERY)
		
		fetch(UPDATE_QUERY)
		.then(response => {
			//console.log(response)
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			setNotEditing()
			setEditingSuccessMessage("Chapter saved!")
			deleteConfirmation()
			
			getChapters()
			onChapterSelect(id)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not save data.")
		})
	}
	
	
	
	
	return (
		<>
			<ChapterContext.Provider value={{ 
				chapters, getChapters, 
				selectedChapterData, onChapterSelect, onChapterCreate, onChapterDelete, onChapterUpdate,
			}}>
				{ props.children }
			</ChapterContext.Provider>
		</>
	)
}