import React, { Component, Fragment } from 'react';
import SectionForm from '../Modals/SectionForm'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

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
import buttonStyles from '../../styles/editorButtonStyles.css'
import toolbarStyles from '../../styles/editorToolbarStyles.css'
// import 'draft-js/dist/Draft.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'

class HeadlinesPicker extends Component {
	componentDidMount() {
	  setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
	}
 
	componentWillUnmount() {
	  window.removeEventListener('click', this.onWindowClick);
	}
 
	onWindowClick = () =>
	  // Call `onOverrideContent` again with `undefined`
	  // so the toolbar can show its regular content again.
	  this.props.onOverrideContent(undefined);
 
	render() {
	  const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
	  return (
		 <div>
			{buttons.map((Button, i) => // eslint-disable-next-line
			  <Button key={i} {...this.props} />
			)}
		 </div>
	  );
	}
 }
 
class HeadlinesButton extends Component {
	onClick = () =>
	  // A button can call `onOverrideContent` to replace the content
	  // of the toolbar. This can be useful for displaying sub
	  // menus or requesting additional information from the user.
	  this.props.onOverrideContent(HeadlinesPicker);
 
	render() {
	  return (
		 <div className={editorStyles.headlineButtonWrapper}>
			<button onClick={this.onClick} className={editorStyles.headlineButton}>
			  H
			</button>
		 </div>
	  );
	}
 }

// const toolbarPlugin = createToolbarPlugin({
// 	theme: { buttonStyles, toolbarStyles }
// })
const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin]

class SectionView extends React.Component {
	constructor(props) {
		super(props);
		const text = this.props.sectionData.text
		// console.log(text)
		this.state = {
			editMode : false,
			editorState: text 
				? EditorState.createWithContent(convertFromRaw(JSON.parse(text))) 
				: EditorState.createEmpty()
			// editorState : createEditorStateWithText(text || '')
		}
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
		return <>
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
							<CodeButton {...externalProps} />
							<Separator {...externalProps} />
							{/* <HeadlinesButton {...externalProps} /> */}
							<UnorderedListButton {...externalProps} />
							<OrderedListButton {...externalProps} />
							<BlockquoteButton {...externalProps} />
							<CodeBlockButton {...externalProps} />
						</React.Fragment>
					)}
				</Toolbar>
				<Button variant="primary" onClick={this.handleTextSave}>Save</Button>
			</>
	}
	
	renderNoEditMeta() {
		const { sectionData: { id, name, description, order, text } } = this.props
		return (
			<>
				<p>{description}</p>
			</>
		)
	}
	
	renderEditMeta() {
		const { chapters, sectionData } = this.props
		return <SectionForm
				chapters={chapters}
				sectionData={sectionData}
				onSectionSave={this.handleMetaSave}
			/>
	}
	
	render() {
		const { 
			sectionData: { id, name, description, order, text },
		} = this.props,
			{ editMode, editorState } = this.state
		return (
			<Container>
				<Row>
					<Col>
						{this.renderEditor()}
					</Col>
					<Col md="3">
						<h3>{name}</h3>
						<Button 
							variant="primary" 
							onClick={this.handleEditToggle} 
							className="float-right"
							size="sm"
						>
							{editMode ? 'Cancel' :'Edit'}
						</Button>
						{ editMode ? this.renderEditMeta() : this.renderNoEditMeta() }
					</Col>
				</Row>
			</Container>
		)
	}
}


export default SectionView;