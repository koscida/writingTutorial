import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal  from 'react-bootstrap/Modal'
import Form  from 'react-bootstrap/Form'
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'

// class AddSection extends React.Component {
// 	state = {
// 		show: false,
// 		section : {
// 			name: null,
// 			description: null,
// 			chapterId: null
// 		}
// 	}
	
// 	handleToggle = () => {
// 		this.setState({ show : !this.state.show })
// 	}
	
// 	handleFormChange = name => e => {
// 		this.setState({
// 			section : { ...this.state.section, [name]: e.target.value }
// 		})
// 	}
	
const AddSection = ({ show, handleToggle, chapters, onSectionSave }) => {
	return (
		<>
			<Modal show={show} onHide={handleToggle}>
				<Formik
					initialValues = {{
						name : null,
						chapterId : null,
						description : null,
						chapters : chapters
					}}
					validationSchema={yup.object({
						name: yup.string()
							.max(100, 'Must be 100 characters or less')
							.required('Required'),
						chapterId: yup.number()
							.required('Required'),
					})}
					onSubmit = {(values, { setSubmitting }) => {
						onSectionSave({
							...values
						})
					}}
				>{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors,
					}) => (
					<Form onSubmit={handleSubmit}>
						<Modal.Header closeButton>
							<Modal.Title>Create New Section</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Group controlId="formSectionrName">
								<Form.Label>Name</Form.Label>
								<Form.Control 
									required
									type="text" 
									name="name"
									onChange={handleChange} 
									isValid={touched.name && !errors.name}
									feedback={errors.name}
									placeholder="Enter name" 
								/>
								<Form.Control.Feedback type="invalid">
									{errors.name}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="formSectionChapter">
								<Form.Label>Chapter</Form.Label>
								<Form.Control 
									required
									as="select" 
									name="chapterId"
									onChange={handleChange}
									isValid={touched.chapterId && !errors.chapterId}
									feedback={errors.chapterId}
									defaultValue="Select chapter..."
								>
									<option>Select chapter...</option>
									{ values.chapters.map( ({id, name}) => <option key={id} value={id}>{name}</option> ) }
								</Form.Control>
								<Form.Control.Feedback type="invalid">
									{errors.chapterId}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group controlId="formSectionDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control 
									as="textarea" 
									rows="4" 
									name="description"
									onChange={handleChange} 
									placeholder="Enter description" 
								/>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleToggle} >
								Close
							</Button>
							<Button 
								variant="primary" 
								type="submit"
								disabled={!values.name || !values.chapterId}
							>
								Save
							</Button>
						</Modal.Footer>
					</Form>
		)}
				</Formik>
			</Modal>
		</>
	)
}

export default AddSection