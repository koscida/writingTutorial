import React from 'react';
import AppContext from '../contexts/AppContext'
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

class SectionView extends React.Component {
	static contextType = AppContext
	
	state = {
		editMode : false,
		editorState : this.setEditorState(),
		id : this.context.selectedSectionData.id
	}
	
	setEditorState() {
		const { text } = this.context.selectedSectionData
		return text 
			? EditorState.createWithContent(convertFromRaw(JSON.parse(text))) 
			: EditorState.createEmpty()
	}
	
	handleEditToggle = () => {
		this.setState({ editMode: !this.state.editMode })
	}
	
	handleEditorChange = editorState => {
		this.setState({ editorState });
	}
	
	handleTextSave = () => {
		const rawEditorState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) )
		// const rawEditorState = this.state.editorState
		this.context.onSectionTextSave({
			...this.context.selectedSectionData,
			text: rawEditorState
		})
	}
	
	handleMetaSave = values => {
		// console.log("handleMetaSave", values)
		this.handleEditToggle()
		this.context.onSectionMetaSave({
			...this.context.selectedSectionData,
			...values
		})
	}
	
	focus = () => {
		this.editor.focus();
	};
	
	renderEditor() {
		const { selectedSectionData: { id } } = this.context
		return <	>
				<Editor 
					key={`editor_${id}`}
					editorState={this.state.editorState} 
					onChange={this.handleEditorChange}
					plugins={plugins}
					spellCheck={true}
					ref={(element) => { this.editor = element; }}
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
				<Button variant="primary" onClick={this.handleTextSave} className="my-md-2">Save</Button>
		</>
	}
	
	renderNoEditMeta() {
		const { selectedSectionData: { name, description, chapterName} } = this.context
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
						onClick={this.handleEditToggle} 
					>
						Edit
					</Button>
				</Col></Row>
			</>
		)
	}
	
	renderEditMeta() {
		return <>
			<Row><Col>
				<SectionMetaForm
					onSave={this.handleMetaSave}
					onCancel={this.handleEditToggle}
				/>
			</Col></Row>
		</>
	}
	
	componentDidUpdate(prevProps, prevState) {
		const currID = this.context.selectedSectionData.id
		const prevId = prevState.id 
		if(currID !== prevId) {
			//Perform some operation here
			this.setState({
				editorState : this.setEditorState(),
				editMode : false,
				id : currID
			});
		}
	}
	
	render() {
		const { editMode } = this.state
		// TODO: add chapter info to section data for: breadcrumbs
		return (
			<>
			<Tabs defaultActiveKey="editor" className="viewTabs">
				<Tab eventKey="editor" title="Editor">
					{this.renderEditor()}
				</Tab>
				<Tab eventKey="meta" title="Meta">
					{ editMode ? this.renderEditMeta() : this.renderNoEditMeta() }
				</Tab>
			</Tabs>
			</>
		)
	}
}


export default SectionView