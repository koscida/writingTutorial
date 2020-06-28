import React, { useContext, useState } from 'react';
import AppContext from '../contexts/AppContext'
import EditingContext from '../contexts/EditingContext'
import ChapterMetaForm from '../forms/ChapterMetaForm'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const ChapterView = () => {
	const [editMode, setEditMode] = useState(false)
	const { selectedChapterData, onChapterMetaSave } = useContext(AppContext)
	const { isEditing, setIsEditing } = useContext(EditingContext)
	
	const handleEditToggle = () => {
		setIsEditing(!editMode)
		setEditMode(!editMode)
	}
	
	const handleMetaSave = values => {
		// console.log("handleMetaSave", values)
		handleEditToggle()
		onChapterMetaSave({
			...selectedChapterData,
			...values
		})
		
	}
	
	const renderEditMeta = () => {
		return <>
			<Row><Col>
				<ChapterMetaForm
					onSave={handleMetaSave}
					onCancel={handleEditToggle}
				/>
			</Col></Row>
		</>
	}
	
	const renderNoEditMeta = () => {
		const { name, description } = selectedChapterData
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
						onClick={handleEditToggle} 
					>
						Edit
					</Button>
				</Col></Row>
			</>
		)
	}
	
	return (
		<Tabs defaultActiveKey="meta" className="viewTabs">
			<Tab eventKey="meta" title="Meta">
				{ editMode ? renderEditMeta() : renderNoEditMeta() }
			</Tab>
		</Tabs>
	)

}

export default ChapterView;