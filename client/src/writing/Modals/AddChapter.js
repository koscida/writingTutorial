import React from 'react'
import ChapterForm from './ChapterForm'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'

class AddChapter extends React.Component {
	state = {
		show: false
	}
	
	handleToggle = () => {
		this.setState({ show : !this.state.show })
	}
	
	handleCreate = values => {
		this.handleToggle()
		this.props.onSubmit(values)
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
						<ChapterForm 
							chapterData={{ id:null, name:null, description:null }}
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