import React from 'react'
import SectionForm from './SectionForm'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'
	
class AddSection extends React.Component{
	state = {
		show: false,
	}
	
	handleToggle = () => {
		this.setState({show: !this.state.show})
	}
	
	handleCreate = values => {
		this.handleToggle()
		this.props.onSubmit(values)
		// console.log(values)
	}
	
	render() {
		const { chapters } = this.props
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
						<SectionForm
							chapters={chapters}
							sectionData={{ id:null, name:null, chapterId:null, description:null }}
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