import React from 'react';
import AppContext from '../contexts/AppContext'
import ChapterList from './ChapterList'
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
			
				<div id="writingTopNav"></div>
				
				<div id="writingWorkspace">
				
					<div id="workspaceSidebar">
						<ChapterList />
					</div>
					
					{/* <div id="workspaceResizer"></div> */}
					
					<div id="workspaceView">
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