import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'
import Form  from 'react-bootstrap/Form'

class AddSection extends React.Component {
	state = {
		show: false,
		section : {
			name: null,
			description: null,
			chapterId: null
		}
	}
	
	handleToggle = () => {
		this.setState({ show : !this.state.show })
	}
	
	handleFormChange = name => e => {
		this.setState({
			section : { ...this.state.section, [name]: e.target.value }
		})
	}
	
	handleSave = () => {
		this.handleToggle()
		this.props.onSave({
			...this.state.section
		})
	}
	
	render() {
		const { show } = this.state,
			{ chapters } = this.props
		return (
			<>
				<Button variant="light" onClick={this.handleToggle}>Add Section</Button>
				
				<Modal show={show} onHide={this.handleToggle}>
					<Modal.Header closeButton>
						<Modal.Title>Create New Section</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group controlId="formSectionrName">
								<Form.Label>Name</Form.Label>
								<Form.Control 
									type="text" 
									placeholder="Enter name" 
									onChange={this.handleFormChange("name")} 
								/>
							</Form.Group>
							<Form.Group controlId="formSectionChapter">
								<Form.Label>Chapter</Form.Label>
								<Form.Control 
									as="select" 
									onChange={this.handleFormChange("chapterId")}
									defaultValue="Select chapter..."
								>
									<option>Select chapter...</option>
									{ chapters.map( ({id, name}) => <option key={id} value={id}>{name}</option> ) }
								</Form.Control>
							</Form.Group>
							<Form.Group controlId="formSectionDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control 
									as="textarea" 
									rows="4" 
									placeholder="Enter description" 
									onChange={this.handleFormChange("description")} 
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleToggle}>
							Close
						</Button>
						<Button variant="primary" onClick={this.handleSave}>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default AddSection