import React from 'react'
import AppContext from '../contexts/AppContext'
import ChapterMetaForm from '../forms/ChapterMetaForm'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'

class AddChapter extends React.Component {
	static contextType = AppContext
	
	state = {
		show: false
	}
	
	handleToggle = () => {
		this.setState({ show : !this.state.show })
	}
	
	handleCreate = values => {
		this.handleToggle()
		this.context.onChapterCreate(values)
		// console.log(values)
	}
	
	render() {
		return (
			<>
				<Button 
					variant="light" 
					onClick={this.handleToggle} 
					size="sm"
					className="mr-sm-2"
				>New Chapter</Button>
				
				<Modal show={this.state.show} onHide={this.handleToggle}>
					<Modal.Header closeButton>
						<Modal.Title>Create New Chapter</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ChapterMetaForm 
							onSave={this.handleCreate}
							onCancel={this.handleToggle}
						/>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}

export default AddChapter