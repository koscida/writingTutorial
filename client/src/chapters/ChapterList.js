import React, { useContext } from 'react'
import ChapterContext from '../contexts/ChapterContext'
import EditingContext from '../contexts/EditingContext'
import AddChapter from './modals/AddChapter'
import AddSection from './modals/AddSection'

function ChapterList(props) {
	const { 
		chapters, 
		selectedChapterData, onChapterSelect,
		selectedSectionData, onSectionSelect,
	} = useContext(ChapterContext)
	const { isEditing, setEditingErrorMessage } = useContext(EditingContext)
	
	const handleSectionSelect = (id) => {
		if(isEditing()) setEditingErrorMessage("Save before switching sections")
		else onSectionSelect(id)
	}
	
	const handleChapterSelect = (id) => {
		if(isEditing()) setEditingErrorMessage("Save before switching chapters")
		else onChapterSelect(id)
	}
	
	return (
		<>
			<div id="sidebarHeader" className="p-sm-2">
				<AddChapter />
				<AddSection />
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
									{sections.length > 0
										?
											<li 
												key={`sections_${id}`} 
												className="sections" 
											>
												<ul key={`section_${id}`}>
													{sections.map( section => (
														<li 
															key={section.id}
															onClick={() => handleSectionSelect(section.id)}
															className={(selectedSectionData && selectedSectionData.id===section.id) ? 'active' : ''}
														>
															{section.name}
														</li>
													))}
												</ul>
											</li>
										: ''
									}
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