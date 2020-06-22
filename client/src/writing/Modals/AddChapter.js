import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'
import Form  from 'react-bootstrap/Form'

class AddChapter extends React.Component {
	// TODO: make into funcitonal component?
	// const [show, setShow] = useState(false);
	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);
	
	state = {
		show: false,
		chapter : {
			name: null,
			description: null
		}
	}
	
	handleToggle = () => {
		this.setState({ show : !this.state.show })
	}
	
	handleFormChange = name => e => {
		this.setState({
			chapter : { ...this.state.chapter, [name]: e.target.value }
		})
	}
	
	handleSave = () => {
		this.handleToggle()
		this.props.onSave({
			...this.state.chapter
		})
	}
	
	render() {
		const { show, chapter : { name } } = this.state
		return (
			<>
				<Button variant="light" onClick={this.handleToggle}>Add Chapter</Button>
				
				<Modal show={show} onHide={this.handleToggle}>
					<Modal.Header closeButton>
						<Modal.Title>Create New Chapter</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group controlId="formChapterName">
								<Form.Label>Name</Form.Label>
								<Form.Control 
									required
									type="text" 
									placeholder="Enter name" 
									onChange={this.handleFormChange("name")} 
								/>
								<Form.Text className="text-muted">
									Chapters are automatically prefixed with chapter numbers
								</Form.Text>
							</Form.Group>
							<Form.Group controlId="formChapterDescription">
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
						<Button 
							variant="primary" 
							onClick={this.handleSave}
							disabled={!name}
						>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default AddChapter