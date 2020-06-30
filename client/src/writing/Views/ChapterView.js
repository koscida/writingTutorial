import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext'
import EditingContext from '../contexts/EditingContext'
import ChapterMetaForm from '../forms/ChapterMetaForm'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const ChapterView = () => {
	const { selectedChapterData, onChapterDelete, setAlert } = useContext(AppContext)
	const { isEditing, editingState, setEditingState } = useContext(EditingContext)
	
	const handleDelete = () => {
		setAlert(
			'Are you sure you want to delete this chapter?' + 
			(selectedChapterData.sectionsCount > 0 
				? ` -- All sections associated with this chapter will NOT be deleted, 
					they will be moved to the unorganized category.`
				: ''
			),
			() => onChapterDelete(selectedChapterData))
	}
	
	const handleEditMetaToggle = () => {
		setEditingState({...editingState, meta: !editingState.meta})
	}
	
	const renderEditMeta = () => {
		return <>
			<Row>
				<Col>
					<ChapterMetaForm context='edit' />
				</Col>
			</Row>
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
						onClick={handleEditMetaToggle} 
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
				{ editingState.meta ? renderEditMeta() : renderNoEditMeta() }
				<hr/>
				<Button variant="outline-danger" onClick={handleDelete}>Delete chapter</Button>
			</Tab>
		</Tabs>
	)

}

export default ChapterView;