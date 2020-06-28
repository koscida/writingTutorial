import React, { createContext, useState } from 'react'

const EditingContext = createContext()

export default EditingContext

export const EditingContextProvider = (props) => {
	const [isEditing, setIsEditing] = useState(false)
	
	return(
		<EditingContext.Provider value={{
			isEditing, setIsEditing,
		}}>
			{ props.children }
		</EditingContext.Provider>
	)
}