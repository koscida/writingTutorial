import React, { useContext } from 'react'
import ChapterContext from '../contexts/ChapterContext'
import EditingContext from '../contexts/EditingContext'
import AddChapter from './modals/AddChapter'

function ChapterList(props) {
	const { 
		chapters, selectedChapterData, onChapterSelect,
	} = useContext(ChapterContext)
	const { isEditing, setEditingErrorMessage } = useContext(EditingContext)
	
	const handleChapterSelect = (id) => {
		if(isEditing()) setEditingErrorMessage("Save before switching chapters")
		else onChapterSelect(id)
	}
	
	return (
		<>
			<div id="sidebarHeader" className="p-sm-2">
				<AddChapter />
			</div>
			<div id="sidebarContent">
				
				<div id="chapterList">
					<ul key={'test'}>
						{chapters.map( ({id, name, sections}, idx) => {
							return (
								<React.Fragment key={id}>
									<li 
										key={id} 
										onClick={() => handleChapterSelect(id)}
										className={(selectedChapterData && selectedChapterData.id===id) ? 'active' : ''}
									>
										{idx+1}. {name}
									</li>
								</React.Fragment>
							)
						})}
					</ul>
				</div>
				
			</div>
		</>
	)
}

export default ChapterList