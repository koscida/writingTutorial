import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'
import AddChapter from '../modals/AddChapter'
import AddSection from '../modals/AddSection'

function ChapterList(props) {
	const { 
		chapters, 
		selectedChapterData, onChapterSelect,
		selectedSectionData, onSectionSelect,
	} = useContext(AppContext)
	return (
		<>
			<div id="sidebarHeader" className="p-sm-2">
				<AddChapter />
				<AddSection />
			</div>
			<div id="sidebarContent">
				
				<div id="chapterList">
					<ul key={'test'}>
						{chapters.map( ({id, name, sections}) => {
							return (
								<React.Fragment key={id}>
									<li 
										key={id} 
										onClick={() => onChapterSelect(id)}
										className={(selectedChapterData && selectedChapterData.id===id) ? 'active' : ''}
									>
										{name}
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
															onClick={() => onSectionSelect(section.id)}
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