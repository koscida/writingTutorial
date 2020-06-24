import React from 'react'
import Context from './Context'
import AddChapter from './Modals/AddChapter'
import AddSection from './Modals/AddSection'

function ChapterList(props) {
	
	const { selectedChapter, selectedSection, 
		onChapterCreate, onSectionCreate,
		onChapterSelect, onSectionSelect } = props
	
	return (
		<Context.Consumer>
			{context => (
				<>
					<div id="sidebarHeader" className="p-sm-2">
						<AddChapter 
							onSubmit={onChapterCreate}
						/>
						
						<AddSection
							chapters={context.chapters}
							onSubmit={onSectionCreate}
						/>
					</div>
					<div id="sidebarContent">
						
						<div id="chapterList">
							<ul key={'test'}>
								{context.chapters.map( ({id, name, sections}) => {
									return (
										<React.Fragment key={id}>
											<li 
												key={id} 
												onClick={() => onChapterSelect(id)}
												className={(selectedChapter===id) ? 'active' : ''}
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
																	className={(selectedSection===section.id) ? 'active' : ''}
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
			)}
		</Context.Consumer>
	)
}

export default ChapterList