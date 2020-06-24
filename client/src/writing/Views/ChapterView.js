import React from 'react';
import ChapterForm from '../Modals/ChapterForm'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

class ChapterView extends React.Component {
	state = {
		editMode : false,
	}
	
	handleEditToggle = () => {
		this.setState({ editMode: !this.state.editMode })
	}
	
	handleMetaSave = values => {
		// console.log("handleMetaSave", values)
		this.handleEditToggle()
		this.props.onMetaSave({
			...this.props.chapternData,
			...values
		})
	}
	
	renderEditMeta() {
		return <>
			<Row><Col>
				<ChapterForm
					chapterData={this.props.chapterData}
					onSave={this.handleMetaSave}
					onCancel={this.handleEditToggle}
				/>
			</Col></Row>
		</>
	}
	
	renderNoEditMeta() {
		const { chapterData: { name, description } } = this.props
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