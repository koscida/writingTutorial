import React from 'react'
import AddChapter from './Modals/AddChapter'
import AddSection from './Modals/AddSection'
import Button from 'react-bootstrap/Button'


class ChapterList extends React.Component {
	
	state = {
		showAddChapter: false,
		showAddSection: false,
	}
	
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
	
	handleAddSectionToggle = () => {
		this.setState({showAddSection: !this.state.showAddSection})
	}
	
	handleAddChapterToggle = () => {
		this.setState({showAddChapter: !this.state.showAddChapter})
	}
	
	handleSectionCreate = values => {
		this.handleAddSectionToggle()
		this.props.onSectionCreate(values)
		// console.log(values)
	}
	
	render() {
		const { chapters, onChapterCreate } = this.props
		const { showAddChapter, showAddSection } = this.state
		
		return (
			<div id="chapterList">
			
				<ul key={'test'}>
					{chapters.map( chapter => this.renderListItems(chapter) )}
				</ul>
				
				<AddChapter 
					onSave={onChapterCreate}
				/>
				
				<Button variant="light" onClick={this.handleAddSectionToggle}>Add Section</Button>
				<AddSection 
					onSectionSave={this.handleSectionCreate}
					chapters={chapters}
					show={showAddSection}
					handleToggle={this.handleAddSectionToggle}
				/>
				
			</div>
		)
	}
}

export default ChapterList