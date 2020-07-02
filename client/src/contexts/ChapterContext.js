import React, { createContext, useState, useContext } from 'react';
import EditingContext from './EditingContext'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const ChapterContext = createContext();

export default ChapterContext;

export const ChapterContextProvider = (props) => {
	const { editingState, setEditingState, setEditingErrorMessage, setEditingSuccessMessage } = useContext(EditingContext)
	
	const [chapters, setChapters] = useState([])
	const [selectedChapterData, setSelectedChapterData] = useState(null)
	const [selectedSectionData, setSelectedSectionData] = useState(null)
	const [alertState, setAlertState] = useState({ 
		isShown: false, 
		message: '', 
		confirm: null,
		cancel: () => {
			console.log("in cancel")
			setAlertState({...alertState, isShown: false, message: '', confirm: null})
		},
	})
	
	
	/*
	 * Select/get functions
	 */
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
			// console.log(data)
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
	
	const getUnorganizedChapterId = () => {
		return chapters.find( c => c.unorganized === 1 ).id
	}
	
	
	/*
	 * Chapter functions
	 */
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
	
	const onChapterDelete = toDeleteChapterData => {
		const { id, sectionsCount } = toDeleteChapterData
		if(sectionsCount > 0) {
			let unorganizedId = getUnorganizedChapterId()
			const sectionsToReorganize = chapters.find( c => c.id === id ).sections
			sectionsToReorganize.forEach( s => updateSection({id: s.id, chapterId: unorganizedId}) )
		}
		fetch(`http://localhost:5000/writing/chapter/delete?
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
			getChapters()
			setSelectedChapterData(null)
			
			setAlertState({...alertState, isShown: false})
			setEditingSuccessMessage("Chapter deleted!")
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not save data.")
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
	
	
	/*
	 * Section functions
	 */
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
	
	const onSectionDelete = toDeleteSectionData => {
		const { id, chapterId } = toDeleteSectionData
		fetch(`http://localhost:5000/writing/section/delete?
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
			getChapters()
			onChapterSelect(chapterId)
			
			setAlertState({...alertState, isShown: false})
			setEditingSuccessMessage("Section deleted!")
		})
		.catch(error => {
			console.log(error)
			setEditingErrorMessage("Something went wrong, could not save data.")
		})
	}
	
	const onSectionTextSave = ({ id, text }) => {
		const FETCH = `http://localhost:5000/writing/section/edit?
			id=${id}&
			text=${text}
		`;
		fetch(FETCH)
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
			console.log(error, FETCH)
			setEditingErrorMessage("Something went wrong, could not save data.")
		})
	}
	
	const onSectionMetaSave = values => {
		let { id, name, description, chapterId, order } = values
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
	
	const updateSection = values => {
		const { id } = values
		let UPDATE_QUERY = `http://localhost:5000/writing/section/edit?`
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
		})
		.catch(error => {
			setEditingErrorMessage("Something went wrong, could update section data.")
			console.log(error)
		})
	}
	
	
	/*
	 * Alert functions
	 */
	const setAlert = (message, confirm) => {
		setAlertState({
			...alertState,
			isShown: true,
			message, 
			confirm, 
		})
	}
	
	const renderAlert = () => {
		return (
			<Alert show={alertState.isShown} variant="warning">
				<Alert.Heading>Warning</Alert.Heading>
				<p>{alertState.message}</p>
				<hr />
				<div className="d-flex justify-content-end">
					<Button onClick={() => alertState.cancel()} variant="outline-primary" className="mr-2">
						Cancel
					</Button>
					<Button onClick={() => alertState.confirm()} variant="danger">
						Confirm
					</Button>
				</div>
			</Alert>
		)
	}
	
	
	
	/*
	 * Helper functions
	 */
	
	
	
	return (
		<>
			<ChapterContext.Provider value={{ 
				chapters, getChapters, 
				selectedChapterData, onChapterSelect, onChapterCreate, onChapterDelete, onChapterMetaSave,
				selectedSectionData, onSectionSelect, onSectionCreate, onSectionDelete, onSectionMetaSave, onSectionTextSave,
				setAlert,
			}}>
				{ props.children }
			</ChapterContext.Provider>
			{renderAlert()}
		</>
	)
}