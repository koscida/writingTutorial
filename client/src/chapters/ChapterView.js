import React, { useContext, useState, useEffect } from 'react';
import ChapterContext from '../contexts/ChapterContext'
import EditingContext from '../contexts/EditingContext'
import ChapterMetaForm from './ChapterMetaForm'
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import {
	ItalicButton, BoldButton, UnderlineButton,
	HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton, 
	UnorderedListButton, OrderedListButton,
	BlockquoteButton, CodeBlockButton, // CodeButton,
} from 'draft-js-buttons';

import 'draft-js-static-toolbar-plugin/lib/plugin.css'

const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin]


const ChapterView = () => {
	const { selectedChapterData, onChapterDelete, onChapterUpdate } = useContext(ChapterContext)
	const { editingState, isEditing, setEditingState, setEditingErrorMessage, setConfirmation } = useContext(EditingContext)
	const initEditorState = () => {
		const { text } = selectedChapterData
		return text 
			? EditorState.createWithContent(convertFromRaw(JSON.parse(text))) 
			: EditorState.createEmpty()
	}
	const [editorState, setEditorState] = useState(initEditorState())
	const [editor, setEditor] = useState(null)
	const [tabKey, setTabKey] = useState('editor')
	
	/* 
	 * Editor
	 */
	const handleEditTextToggle = () => {
		setEditingState({text: !editingState.text})
	}
	
	const handleEditorChange = editorState => {
		setEditorState(editorState);
	}
	
	const handleTextSave = () => {
		const rawEditorState = JSON.stringify( convertToRaw(editorState.getCurrentContent()) )
		onChapterUpdate({
			...selectedChapterData,
			text: rawEditorState
		})
	}
	
	const handleTextCancel = () => {
		handleEditTextToggle()
		setEditorState(initEditorState())
	}
	
	
	/* 
	 * Edit meta
	 */
	const handleEditMetaToggle = () => {
		setEditingState({meta: !editingState.meta})
	}
	
	const handleDelete = () => {
		setConfirmation(
			'Are you sure you want to delete this chapter?',
			() => onChapterDelete(selectedChapterData))
	}
	
	
	
	
	/* 
	 * Tabs
	 */
	const handleTabChange = (key) => {
		if(isEditing()) setEditingErrorMessage("Save before switching tabs")
		else setTabKey(key)
	}
	
	
	/* 
	 * Render
	 */
	const renderEditor = () => {
		const { id } = selectedChapterData
		return (
			<div className={"editorWritingPad " + (!editingState.text?" readOnly":'')}>
				<Editor 
					key={`editor_${id}`}
					editorState={editorState} 
					onChange={handleEditorChange}
					plugins={plugins}
					spellCheck={true}
					ref={(element) => { setEditor(element) }}
					placeholder="Tell a story..."
					readOnly={!editingState.text}
				/>
				{editingState.text
					? <Toolbar key={`toolbar_${id}`} className="editorToolbar">
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
									<UnorderedListButton {...externalProps} />
									<OrderedListButton {...externalProps} />
									<BlockquoteButton {...externalProps} />
									<CodeBlockButton {...externalProps} />
								</React.Fragment>
							)}
						</Toolbar>
					: null}
				{editingState.text
					? <>
							<Button variant="primary" onClick={handleTextSave} className="mt-md-2 mr-md-2">Save</Button>
							<Button variant="outline-danger" onClick={handleTextCancel} className="mt-md-2">Cancel</Button>
						</>
					: <Button variant="primary" onClick={handleEditTextToggle} className="mt-md-2">Edit</Button>
				}
			</div>
		)
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
	
	useEffect( () => {
		const { text } = selectedChapterData
		const newEditorState =  text 
			? EditorState.createWithContent(convertFromRaw(JSON.parse(text))) 
			: EditorState.createEmpty()
		setEditorState(newEditorState)
	}, [selectedChapterData])
	
	
	return (
		<Tabs activeKey={tabKey} className="viewTabs" onSelect={handleTabChange}>
			<Tab eventKey="editor" title="Editor">
				{renderEditor()}
			</Tab>
			<Tab eventKey="meta" title="Meta">
				{ editingState.meta ? renderEditMeta() : renderNoEditMeta() }
				<hr/>
				<Button variant="outline-danger" onClick={handleDelete}>Delete chapter</Button>
			</Tab>
		</Tabs>
	)

}

export default ChapterView;