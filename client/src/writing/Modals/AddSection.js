import React from 'react'
import AppContext from '../contexts/AppContext'
import SectionMetaForm from '../forms/SectionMetaForm'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'
	
class AddSection extends React.Component {
	static contextType = AppContext
	
	state = {
		show: false,
	}
	
	handleToggle = () => {
		this.setState({show: !this.state.show})
	}
	
	handleCreate = values => {
		this.handleToggle()
		this.context.onSectionCreate(values)
		// console.log(values)
	}
	
	render() {
		return (
			<>
				<Button 
					variant="light" 
					onClick={this.handleToggle}
					size="sm"
				>New Section</Button>
				<Modal show={this.state.show} onHide={this.handleToggle}>
					<Modal.Header closeButton>
						<Modal.Title>Create New Section</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<SectionMetaForm
							onSave={this.handleCreate}
							onCancel={this.handleToggle}
						/>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}

export default AddSection