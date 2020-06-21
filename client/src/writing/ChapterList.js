import React from 'react'
import AddChapter from './Modals/AddChapter'
import AddSection from './Modals/AddSection'


class ChapterList extends React.Component {
	
	renderListItems({id, name, sections}) {
		const { 
			selected : {chapter: selectedChapter, section: selectedSection }, 
			onChapterSelect, 
			onSectionSelect
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
	
	render() {
		const { 
			chapters,
			onChapterCreate,
			onSectionCreate
		} = this.props
		
		return (
			<div id="chapterList">
				<ul key={'test'}>
					{chapters.map( chapter => this.renderListItems(chapter) )}
				</ul>
				<AddChapter 
					onSave={onChapterCreate}
				/>
				<AddSection 
					onSave={onSectionCreate}
					chapters={chapters}
				/>
			</div>
		)
	}
}

export default ChapterList