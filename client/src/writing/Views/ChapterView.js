import React from 'react';
import AppContext from '../contexts/AppContext'
import ChapterMetaForm from '../forms/ChapterMetaForm'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

class ChapterView extends React.Component {
	static contextType = AppContext
	
	state = {
		editMode : false,
	}
	
	handleEditToggle = () => {
		this.setState({ editMode: !this.state.editMode })
	}
	
	handleMetaSave = values => {
		// console.log("handleMetaSave", values)
		this.handleEditToggle()
		this.context.onChapterMetaSave({
			...this.context.selectedChapterData,
			...values
		})
		
	}
	
	renderEditMeta() {
		return <>
			<Row><Col>
				<ChapterMetaForm
					onSave={this.handleMetaSave}
					onCancel={this.handleEditToggle}
				/>
			</Col></Row>
		</>
	}
	
	renderNoEditMeta() {
		const { selectedChapterData: { name, description } } = this.context
		return (
			<>
				<Row className="my-sm-3">
					<Col sm="2">Name</Col>
					<Col>{name}</Col>
				</Row>
				<Row className="my-sm-3">
					<Col sm="2">Description</Col>
					<Col><p>{description}</p></Col>
				</Row>
				<Row className="my-sm-3"><Col>
					<Button 
						variant="primary" 
						onClick={this.handleEditToggle} 
					>
						Edit
					</Button>
				</Col></Row>
			</>
		)
	}
	
	render() {
		return (
			<Tabs defaultActiveKey="meta" className="viewTabs">
				<Tab eventKey="meta" title="Meta">
					{ this.state.editMode ? this.renderEditMeta() : this.renderNoEditMeta() }
				</Tab>
			</Tabs>
		)
	}

}

export default ChapterView;