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
	const { selectedSectionData, onSectionTextSave, onSectionDelete, setAlert } = useContext(AppContext)
	const { isEditing, editingState, setEditingState, setEditingErrorMessage } = useContext(EditingContext)
	
	const initEditorState = () => {
		const { text } = selectedSectionData
		return text 
			? EditorState.createWithContent(convertFromRaw(JSON.parse(text))) 
			: EditorState.createEmpty()
	}
	
	const [editorState, setEditorState] = useState(initEditorState())
	const [editor, setEditor] = useState(null)
	const [tabKey, setTabKey] = useState('editor')
	
	
	const handleEditMetaToggle = () => {
		setEditingState({...editingState, meta: !editingState.meta})
	}
	
	const handleEditTextToggle = () => {
		setEditingState({...editingState, text: !editingState.text})
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
	
	const handleTextCancel = () => {
		handleEditTextToggle()
		setEditorState(initEditorState())
	}
	
	const handleDelete = () => {
		setAlert("Are you sure you want to delete this section?", () => onSectionDelete(selectedSectionData))
	}
	
	const handleTabChange = (key) => {
		if(isEditing()) setEditingErrorMessage("Save before switching tabs")
		else setTabKey(key)
	}
	
	const focus = () => {
		editor.focus();
	}
	
	const renderEditor = () => {
		const { id } = selectedSectionData
		return <	>
			<Editor 
				className="editorWritingPad"
				key={`editor_${id}`}
				editorState={editorState} 
				onChange={handleEditorChange}
				plugins={plugins}
				spellCheck={true}
				ref={(element) => { setEditor(element) }}
				placeholder="Tell a story..."
				readOnly={!editingState.text}
			/>
			<Toolbar key={`toolbar_${id}`} className="editorToolbar">
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
			{editingState.text
				? <>
						<Button variant="primary" onClick={handleTextSave} className="mt-md-2 mr-md-2">Save</Button>
						<Button variant="outline-danger" onClick={handleTextCancel} className="mt-md-2">Cancel</Button>
					</>
				: <Button variant="primary" onClick={handleEditTextToggle} className="mt-md-2">Edit</Button>
			}
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
						onClick={handleEditMetaToggle} 
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
					<SectionMetaForm context='edit' />
				</Col>
			</Row>
		</>
	}
	
	useEffect( () => {
		const { text } = selectedSectionData
		const newEditorState =  text 
			? EditorState.createWithContent(convertFromRaw(JSON.parse(text))) 
			: EditorState.createEmpty()
		setEditorState(newEditorState)
	}, [selectedSectionData])
	
	return (
		<>
		<Tabs activeKey={tabKey} className="viewTabs" onSelect={handleTabChange}>
			<Tab eventKey="editor" title="Editor">
				{renderEditor()}
			</Tab>
			<Tab eventKey="meta" title="Meta">
				{ editingState.meta ? renderEditMeta() : renderNoEditMeta() }
				<hr/>
				<Button variant="outline-danger" onClick={handleDelete}>Delete section</Button>
			</Tab>
		</Tabs>
		</>
	)
}


export default SectionView