import React from 'react';
import CharacterList from './CharacterList'

class Characters extends React.Component {
	
	componentDidMount() {
		
	}
	
	render () {
		
		return (
			<div id="contentInner">
				<div id="sidebar">
					<div id="sidebarInner">
						<CharacterList />
					</div>
				</div>
				
				{/* <div id="workspaceResizer"></div> */}
				
				<div id="workspace">
					<div id="header" className="d-sm-block d-md-none">
						
					</div>
					<div id="view">
						
					</div>
				</div>
			</div>
		)
	}
}

export default Characters;