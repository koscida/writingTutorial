import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'

const Header = () => {
	const { selectedSectionData, selectedChapterData, } = useContext(AppContext)
	
	return (
		selectedChapterData 
			? selectedChapterData.name
			: selectedSectionData
				? selectedSectionData.name
				: "Welcome"
		
	)
}

export default Header