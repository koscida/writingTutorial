import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'
import EditingContext from '../contexts/EditingContext'
import Button from 'react-bootstrap/Button'
import Form  from 'react-bootstrap/Form'
import { Formik } from 'formik';
import * as yup from 'yup'

const SectionMetaForm = ({context}) => {
	const { chapters, selectedSectionData, onSectionCreate, onSectionMetaSave } = useContext(AppContext)
	const { editingState, setEditingState } = useContext(EditingContext)
	const { id, name, chapterId, description } = selectedSectionData || { id:null, name:'', chapterId:null, description:'' }
	
	return (
		<>
			<Formik
				initialValues = {{
					name : name,
					id : id,
					chapterId : chapterId,
					description : description,
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
					context === 'create'
						? onSectionCreate(values)
						: onSectionMetaSave(values)
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
					<Form.Group controlId="formSectionName">
						<Form.Label>Name</Form.Label>
						<Form.Control 
							required
							type="text" 
							name="name"
							value={values.name}
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
							value={values.chapterId}
							onChange={handleChange}
							isValid={touched.chapterId && !errors.chapterId}
							feedback={errors.chapterId}
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
							value={values.description}
							onChange={handleChange} 
							placeholder="Enter description" 
						/>
					</Form.Group>
					
					<Button 
						variant="primary" 
						onClick={handleSubmit}
						disabled={!values.name || !values.chapterId}
						className="mr-sm-2"
					>
						Save
					</Button>
					<Button 
						variant="outline-danger" 
						onClick={ () => (context==='create')
							? setEditingState({...editingState, createSection: false}) 
							: setEditingState({...editingState, meta: false}) 
						}
					>
						Cancel
					</Button>
				</Form>
			)}
			</Formik>
		</>
	)
}

export default SectionMetaForm