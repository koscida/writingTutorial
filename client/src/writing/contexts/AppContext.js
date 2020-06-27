import React, { createContext, useState } from 'react';

const AppContext = createContext();

export default AppContext;

export const AppContextProvider = (props) => {
	const [chapters, setChapters] = useState([])
	const [selectedChapterData, setSelectedChapterData] = useState(null)
	const [selectedSectionData, setSelectedSectionData] = useState(null)
	
	const getChapters = () => {
		// TODO: check for ok status codes, assumes 200 rn
		fetch('http://localhost:5000/writing/chapter/list')
		.then(response => {
			//console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			//console.log(data)
			setChapters(data)
		})
		.catch(error => console.log(error));
	}
	
	const onChapterSelect = id => {
		fetch(`http://localhost:5000/writing/chapter/${id}`)
		.then(response => {
			//console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			//console.log(data)
			setSelectedChapterData(data[0])
			setSelectedSectionData(null)
		})
		.catch(error => console.log(error));
	}
	
	const onSectionSelect = id => {
		fetch(`http://localhost:5000/writing/section/${id}`)
		.then(response => {
			//console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			//console.log(data)
			setSelectedSectionData(data[0])
			setSelectedChapterData(null)
		})
		.catch(error => console.log(error));
	}
	
	const onChapterCreate = ({name, description}) => {
		// TODO: check for ok status codes, assumes 200 rn
		fetch(`http://localhost:5000/writing/chapter/add?
			name=${name}&
			description=${description}&
			order=${chapters[chapters.length-1].order + 1}
		`)
		.then(response => {
			//console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			// console.log(data)
			getChapters()
			onChapterSelect(data.insertId)
		})
		.catch(error => console.log(error));
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
			return response.json()
		})
		.then( ({ data }) => {
			// console.log(data)
			getChapters();
			onSectionSelect(data.insertId)
		})
		.catch(error => console.log(error));
	}
	
	const onSectionTextSave = ({ id, text }) => {
		fetch(`http://localhost:5000/writing/section/edit?
			id=${id}&
			text=${text}
		`)
		.then(response => {
			//console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			// console.log(data)
			getChapters()
		})
		.catch(error => console.log(error))
	}
	
	// handleSectionMetaSave = ({ id, name, description, chapterId }) => {
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
			return response.json()
		})
		.then( ({ data }) => {
			// console.log(data)
			getChapters()
			onSectionSelect(id)
		})
		.catch(error => console.log(error));
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
			return response.json()
		})
		.then( ({ data }) => {
			// console.log(data)
			getChapters()
			onChapterSelect(id)
		})
		.catch(error => console.log(error));
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