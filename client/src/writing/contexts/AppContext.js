import React, { createContext, useState, useContext } from 'react';
import EditingContext from '../contexts/EditingContext'

const AppContext = createContext();

export default AppContext;

export const AppContextProvider = (props) => {
	const { editingState, setEditingState, setEditingErrorMessage, setEditingSuccessMessage } = useContext(EditingContext)
	
	const [chapters, setChapters] = useState([])
	const [selectedChapterData, setSelectedChapterData] = useState(null)
	const [selectedSectionData, setSelectedSectionData] = useState(null)
	
	const getChapters = () => {
		// TODO: check for ok status codes, assumes 200 rn
		fetch('http://localhost:5000/writing/chapter/list')
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
		fetch(`http://localhost:5000/writing/chapter/${id}`)
		.then(response => {
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			//console.log(data)
			setSelectedChapterData(data[0])
			setSelectedSectionData(null)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not select chapter.")
		})
	}
	
	const onSectionSelect = id => {
		fetch(`http://localhost:5000/writing/section/${id}`)
		.then(response => {
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			//console.log(data)
			setSelectedSectionData(data[0])
			setSelectedChapterData(null)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not select section.")
		})
	}
	
	const onChapterCreate = ({name, description}) => {
		// TODO: check for ok status codes, assumes 200 rn
		fetch(`http://localhost:5000/writing/chapter/add?
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
			setEditingState({...editingState, createChapter: false})
			setEditingSuccessMessage("Chapter created!")
			getChapters()
			onChapterSelect(data.insertId)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not create section. (1)")
		})
		
	}
	
	const onSectionCreate = ({ name, description, chapterId }) => {
		const chap = chapters.find(c => c.id === parseInt(chapterId))
		const order = (chap.sections.length > 0) ? chap.sections[chap.sections.length-1].order + 1 : 0
		// console.log(order)
		// TODO: check for ok status codes, assumes 200 rn
		const FETCH_URL = `http://localhost:5000/writing/section/add?
			name=${name}&
			description=${description}&
			chapterId=${chapterId}&
			order=${order}
		`;
		// console.log(FETCH_URL)
		fetch(FETCH_URL)
		.then(response => {
			//console.log(response)
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			// console.log(data)
			getChapters();
			onSectionSelect(data.insertId)
			
			setEditingState({...editingState, createSection: false})
			setEditingSuccessMessage("Section created!")
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not create section.")
		})
	}
	
	const onSectionTextSave = ({ id, text }) => {
		fetch(`http://localhost:5000/writing/section/edit?
			id=${id}&
			text=${text}
		`)
		.then(response => {
			//console.log(response)
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			// console.log(data)
			getChapters()
			onSectionSelect(id)
			
			setEditingState({...editingState, text: false})
			setEditingSuccessMessage("Section saved!")
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not save data.")
		})
	}
	
	const onSectionMetaSave = values => {
		const { id, name, description, chapterId } = values
		let { order } = values
		if(chapterId !== selectedSectionData.chapterId){
			const chap = chapters.find(c => c.id === parseInt(chapterId))
			order = (chap.sections.length > 0) ? chap.sections[chap.sections.length-1].order + 1 : 0
		}
		// console.log("handleSectionMetaSave", values)
		fetch(`http://localhost:5000/writing/section/edit?
			id=${id}&
			name=${name}&
			description=${description}&
			chapterId=${chapterId}&
			order=${order}
		`)
		.then(response => {
			//console.log(response)
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			setEditingState({...editingState, meta: false})
			setEditingSuccessMessage("Section saved!")
			getChapters()
			onSectionSelect(id)
		})
		.catch(error => {
			setEditingErrorMessage("Something went wrong, could not save data.")
			console.log(error)
		})
	}
	
	const onChapterMetaSave = values => {
		const { id, name, description } = values
		// console.log("handleSectionMetaSave", values)
		fetch(`http://localhost:5000/writing/chapter/edit?
			id=${id}&
			name=${name}&
			description=${description}
		`)
		.then(response => {
			//console.log(response)
			if(response.ok)
				return response.json()
			throw new Error('Network response was not ok.');
		})
		.then( ({ data }) => {
			setEditingState({...editingState, meta: false})
			setEditingSuccessMessage("Chapter saved!")
			getChapters()
			onChapterSelect(id)
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not save data.")
		})
	}
	
	return (
		<AppContext.Provider value={{ 
			chapters, getChapters, 
			selectedChapterData, onChapterSelect, onChapterCreate, onChapterMetaSave,
			selectedSectionData, onSectionSelect, onSectionCreate, onSectionMetaSave, onSectionTextSave 
		}}>
			{ props.children }
		</AppContext.Provider>
	)
}