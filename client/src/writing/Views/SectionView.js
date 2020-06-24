import React, { Component } from 'react';
import SectionForm from '../Modals/SectionForm'
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
	CodeButton,
	HeadlineOneButton,
	HeadlineTwoButton,
	HeadlineThreeButton,
	UnorderedListButton,
	OrderedListButton,
	BlockquoteButton,
	CodeBlockButton,
} from 'draft-js-buttons';

import editorStyles from '../../styles/editorStyles.css'
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
	state = {
		editMode : false,
		editorState : this.setEditorState()
	}
	
	setEditorState() {
		return this.props.sectionData.text 
			? EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.sectionData.text))) 
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
		this.props.onTextSave({
			...this.props.sectionData,
			text: rawEditorState
		})
	}
	
	handleMetaSave = values => {
		// console.log("handleMetaSave", values)
		this.handleEditToggle()
		this.props.onMetaSave({
			...this.props.sectionData,
			...values
		})
	}
	
	focus = () => {
		this.editor.focus();
	};
	
	renderEditor() {
		const { sectionData: { id } } = this.props
		return <	>
				<Editor 
					key={`editor_${id}`}
					editorState={this.state.editorState} 
					onChange={this.handleEditorChange}
					plugins={plugins}
					spellCheck={true}
					ref={(element) => { this.editor = element; }}
					placeholder="Tell a story..."
					// readOnly={!this.state.editMode}
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
		const { sectionData: { name, description, chapterName} } = this.props
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
		const { chapters, sectionData } = this.props
		return <>
			<Row><Col>
				<SectionForm
					chapters={chapters}
					sectionData={sectionData}
					onSave={this.handleMetaSave}
					onCancel={this.handleEditToggle}
				/>
			</Col></Row>
		</>
	}
	
	componentDidUpdate(prevProps, prevState) {
		if(prevProps.sectionData.id !== this.props.sectionData.id) {
			//Perform some operation here
			this.setState({
				editorState : this.setEditorState(),
				editMode : false
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


export default SectionView;