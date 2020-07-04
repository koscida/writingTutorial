import React from 'react';
import ChapterContext from '../contexts/ChapterContext'
import ChapterList from './ChapterList'
import Header from './Header'
import WelcomeView from './WelcomeView'
import ChapterView from './ChapterView'

class Writing extends React.Component {
	static contextType = ChapterContext
	
	componentDidMount() {
		document.title = 'Chapters'
		this.context.getChapters()
	}
	
	render () {
		const { selectedChapterData } = this.context
		
		return (
			<div id="contentInner">
				<div id="sidebar">
					<div id="sidebarInner">
						<ChapterList />
					</div>
				</div>
				
				{/* <div id="workspaceResizer"></div> */}
				
				<div id="workspace">
					<div id="header" className="d-sm-block d-md-none">
						<Header />
					</div>
					<div id="view">
						{( selectedChapterData 
							? <ChapterView />
							: <WelcomeView />
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default Writing;