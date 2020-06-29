import React from 'react';
import AppContext from '../contexts/AppContext'
import TopNav from './TopNav'
import ChapterList from './ChapterList'
import Header from './Header'
import WelcomeView from './WelcomeView'
import ChapterView from './ChapterView'
import SectionView from './SectionView'

class Writing extends React.Component {
	static contextType = AppContext
	
	componentDidMount() {
		this.context.getChapters();
	}
	
	render () {
		const { selectedChapterData, selectedSectionData } = this.context
		
		return (
			<div id="writingContainer">
			
				<div id="writingTopNav">
					<TopNav />
				</div>
				
				<div id="writingContent">
				
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
								: ( selectedSectionData 
										? <SectionView />
										: <WelcomeView />
									)
							)}
						</div>
					</div>
					
				</div>
				
				<div id="writingBanners"></div>
				
			</div>
		)
	}
}

export default Writing;