import React from 'react';
import ChapterList from './ChapterList'
import WelcomeView from './Views/WelcomeView'
import ChapterView from './Views/ChapterView'
import SectionView from './Views/SectionView'

import '../styles/styles.scss'

class Writing extends React.Component {
	state = {
		chapters : [],
		selected : {
			chapter : null,
			section : null
		}
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
				selected: {
					chapter : id,
					section : null,
					chapterData: data[0]
				}
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
				selected: {
					chapter : null,
					section : id,
					sectionData: data[0]
				}
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
			this.getChapters();
		})
		.catch(error => console.log(error));
	}
	
	handleSectionCreate = ({ name, description, chapterId }) => {
		const { chapters } = this.state
		const chap = chapters.find(c => c.id === parseInt(chapterId))
		// TODO: check for ok status codes, assumes 200 rn
		fetch(`http://localhost:5000/writing/section/add?
			name=${name}&
			description=${description}&
			chapterId=${chapterId}&
			order=${chap.sections[chap.sections.length-1].order + 1}
		`)
		.then(response => {
			//console.log(response)
			return response.json()
		})
		.then( ({ data }) => {
			console.log(data)
			this.getChapters();
		})
		.catch(error => console.log(error));
	}
	
	
	render () {
		const { chapters, selected } = this.state
		
		let view = <WelcomeView />;
		if(selected.chapter) {
			view = <ChapterView 
				chapterData={selected.chapterData}
			/>
		} else if(selected.section) {
			view = <SectionView 
				sectionData={selected.sectionData}
			/>
		}
		
		return (
			<div id="writingRoot">
				<ChapterList
					chapters={chapters}
					selected={selected}
					onChapterSelect={this.handleChapterSelect}
					onSectionSelect={this.handleSectionSelect}
					onChapterCreate={this.handleChapterCreate}
					onSectionCreate={this.handleSectionCreate}
				/>
				<div id="view">
					{view}
				</div>
			</div>
		)
	}
}

export default Writing;