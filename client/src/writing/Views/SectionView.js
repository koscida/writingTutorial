import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../contexts/AppContext'
import EditingContext from '../contexts/EditingContext'
import SectionMetaForm from '../forms/SectionMetaForm'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'

import {
	ItalicButton,
	BoldButton,
	UnderlineButton,
	// CodeButton,
	HeadlineOneButton,
	HeadlineTwoButton,
	HeadlineThreeButton,
	UnorderedListButton,
	OrderedListButton,
	BlockquoteButton,
	CodeBlockButton,
} from 'draft-js-buttons';

// import editorStyles from '../../styles/editorStyles.css'
// import buttonStyles from '../../styles/editorButtonStyles.css'
// import toolbarStyles from '../../styles/editorToolbarStyles.css'
// import 'draft-js/dist/Draft.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'

// const toolbarPlugin = createToolbarPlugin({
// 	theme: { buttonStyles, toolbarStyles }
// })
const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin]

const SectionView = () => {
	const { selectedSectionData, onSectionTextSave, onSectionMetaSave } = useContext(AppContext)
	const { isEditing, setIsEditing } = useContext(EditingContext)
	
	const initEditorState = () => {
		const { text } = selectedSectionData
		return text 
			? EditorState.createWithContent(convertFromRaw(JSON.parse(text))) 
			: EditorState.createEmpty()
	}
	
	const [editMode, setEditMode] = useState(false)
	const [editorState, setEditorState] = useState(initEditorState())
	const [id, setId] = useState(selectedSectionData.id)
	const [editor, setEditor] = useState(null)
	
	
	const handleEditToggle = () => {
		setIsEditing(!editMode)
		setEditMode(!editMode)
	}
	
	const handleEditorChange = editorState => {
		setEditorState(editorState);
	}
	
	const handleTextSave = () => {
		const rawEditorState = JSON.stringify( convertToRaw(editorState.getCurrentContent()) )
		onSectionTextSave({
			...selectedSectionData,
			text: rawEditorState
		})
	}
	
	const handleMetaSave = values => {
		handleEditToggle()
		onSectionMetaSave({
			...selectedSectionData,
			...values
		})
	}
	
	const focus = () => {
		editor.focus();
	};
	
	const renderEditor = () => {
		const { id } = selectedSectionData
		return <	>
				<Editor 
					key={`editor_${id}`}
					editorState={editorState} 
					onChange={handleEditorChange}
					plugins={plugins}
					spellCheck={true}
					ref={(element) => { setEditor(element) }}
					placeholder="Tell a story..."
				/>
				<Toolbar key={`toolbar_${id}`}>
					{(externalProps) => (
						<React.Fragment>
							<BoldButton {...externalProps} />
							<ItalicButton {...externalProps} />
							<UnderlineButton {...externalProps} />
							{/* <CodeButton {...externalProps} /> */}
							<Separator {...externalProps} />
							<HeadlineOneButton {...externalProps} />
							<HeadlineTwoButton {...externalProps} />
							<HeadlineThreeButton {...externalProps} />
							<Separator {...externalProps} />
							{/* <HeadlinesButton {...externalProps} /> */}
							<UnorderedListButton {...externalProps} />
							<OrderedListButton {...externalProps} />
							<BlockquoteButton {...externalProps} />
							<CodeBlockButton {...externalProps} />
						</React.Fragment>
					)}
				</Toolbar>
				<Button variant="primary" onClick={handleTextSave} className="mt-md-2">Save</Button>
		</>
	}
	
	const renderNoEditMeta = () => {
		const { name, description, chapterName} = selectedSectionData
		return (
			<>
				<Row className="my-sm-3">
					<Col sm="2">Name</Col>
					<Col>{name}</Col>
				</Row>
				<Row className="my-sm-3">
					<Col sm="2">Chapter</Col>
					<Col>{chapterName}</Col>
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
	
	const renderEditMeta = () => {
		return <>
			<Row>
				<Col>
					<SectionMetaForm
						onSave={handleMetaSave}
						onCancel={handleEditToggle}
					/>
				</Col>
			</Row>
		</>
	}
	
	// useEfect
	// componentDidUpdate(prevProps, prevState) {
	// 	const currID = this.context.selectedSectionData.id
	// 	const prevId = prevState.id 
	// 	if(currID !== prevId) {
	// 		//Perform some operation here
	// 		this.setState({
	// 			editorState : this.setEditorState(),
	// 			editMode : false,
	// 			id : currID
	// 		});
	// 	}
	// }
	
	return (
		<>
		<Tabs defaultActiveKey="editor" className="viewTabs">
			<Tab eventKey="editor" title="Editor">
				{renderEditor()}
			</Tab>
			<Tab eventKey="meta" title="Meta">
				{ editMode ? renderEditMeta() : renderNoEditMeta() }
			</Tab>
		</Tabs>
		</>
	)
}


export default SectionView