import React from 'react';
import { Provider } from './Context'
import ChapterList from './ChapterList'
import WelcomeView from './Views/WelcomeView'
import ChapterView from './Views/ChapterView'
import SectionView from './Views/SectionView'

import '../styles/styles.scss'

class Writing extends React.Component {
	state = {
		chapters : [],
		selectedChapter : null,
		selectedSection : null,
		selectedSectionData : null,
		selectedChapterData : null
	}
	
	componentDidMount() {
		this.getChapters();
	}
	
	getChapters = (_) => {
		// TODO: check for ok status codes, assumes 200 rn
		fetch('http://localhost:5000/writing/chapter/list')
		.then(response => {
			//console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			//console.log(data)
			this.setState({
				chapters: data
			})
		})
		.catch(error => console.log(error));
	}
	
	handleChapterSelect = id => {
		fetch(`http://localhost:5000/writing/chapter/${id}`)
		.then(response => {
			//console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			//console.log(data)
			this.setState((prevState, props) => ({
				selectedChapter : id,
				selectedChapterData: data[0],
				selectedSection : null,
				selectedSectionData: null,
			}))
		})
		.catch(error => console.log(error));
	}
	
	handleSectionSelect = id => {
		fetch(`http://localhost:5000/writing/section/${id}`)
		.then(response => {
			//console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			//console.log(data)
			this.setState((prevState, props) => ({
				selectedSection : id,
				selectedSectionData : data[0],
				selectedChapter : null,
				selectedChapterData : null,
			}))
		})
		.catch(error => console.log(error));
	}
	
	handleChapterCreate = ({name, description}) => {
		const { chapters } = this.state
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
			this.getChapters()
			this.handleChapterSelect(data.insertId)
		})
		.catch(error => console.log(error));
	}
	
	handleSectionCreate = ({ name, description, chapterId }) => {
		const { chapters } = this.state
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
			this.getChapters();
			this.handleSectionSelect(data.insertId)
		})
		.catch(error => console.log(error));
	}
	
	handleSectionTextSave = ({ id, text }) => {
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
			this.getChapters()
		})
		.catch(error => console.log(error))
	}
	
	// handleSectionMetaSave = ({ id, name, description, chapterId }) => {
	handleSectionMetaSave = values => {
		const { id, name, description, chapterId } = values
		let { order } = values
		if(chapterId !== this.state.selected.sectionData.chapterId){
			const chap = this.state.chapters.find(c => c.id === parseInt(chapterId))
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
			this.getChapters()
			this.handleSectionSelect(id)
		})
		.catch(error => console.log(error));
	}
	
	handleChapterMetaSave = values => {
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
			this.getChapters()
			this.handleChapterSelect(id)
		})
		.catch(error => console.log(error));
	}
	
	render () {
		const { 
			chapters, 
			selectedChapter, selectedChapterData,
			selectedSection, selectedSectionData
		} = this.state
		
		let view = <WelcomeView />;
		if(selectedChapter) {
			view = <ChapterView 
				chapterData={selectedChapterData}
				onMetaSave={this.handleChapterMetaSave}
			/>
		} else if(selectedSection) {
			view = <SectionView 
				chapters={chapters}
				sectionData={selectedSectionData}
				onTextSave={this.handleSectionTextSave}
				onMetaSave={this.handleSectionMetaSave}
			/>
		}
		
		return (
			<Provider value={this.getContext()}>
				<div id="writingContainer">
				
					<div id="writingTopNav"></div>
					
					<div id="writingWorkspace">
					
						<div id="workspaceSidebar">
							<ChapterList
								chapters={chapters}
								selectedChapter={selectedChapter}
								selectedSection={selectedSection}
								onChapterSelect={this.handleChapterSelect}
								onSectionSelect={this.handleSectionSelect}
								onChapterCreate={this.handleChapterCreate}
								onSectionCreate={this.handleSectionCreate}
							/>
						</div>
						
						{/* <div id="workspaceResizer"></div> */}
						
						<div id="workspaceView">
							<div id="view">
								{view}
							</div>
						</div>
						
					</div>
					
					<div id="writingBanners"></div>
					
				</div>
			</Provider>
		)
	}
}

export default Writing;