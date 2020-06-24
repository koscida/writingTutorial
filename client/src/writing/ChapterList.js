import React from 'react'
import AddChapter from './Modals/AddChapter'
import AddSection from './Modals/AddSection'

class ChapterList extends React.Component {
	
	renderListItems({id, name, sections}) {
		const { 
			selectedChapter, selectedSection, 
			onChapterSelect, onSectionSelect
		} = this.props
		return <React.Fragment key={id}>
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
	}
	
	handleSectionCreate = values => {
		this.handleAddSectionToggle()
		this.props.onSectionCreate(values)
		// console.log(values)
	}
	
	render() {
		const { chapters, onChapterCreate, onSectionCreate } = this.props
		
		return (
			<>
				<div id="sidebarHeader" className="p-sm-2">
					<AddChapter 
						onSubmit={onChapterCreate}
					/>
					
					<AddSection
						chapters={chapters}
						onSubmit={onSectionCreate}
					/>
				</div>
				<div id="sidebarContent">
					
					<div id="chapterList">
						<ul key={'test'}>
							{chapters.map( chapter => this.renderListItems(chapter) )}
						</ul>
					</div>
					
				</div>
			</>
		)
	}
}

export default ChapterList