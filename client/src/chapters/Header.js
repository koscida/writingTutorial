import React, { useContext } from 'react'
import ChapterContext from '../contexts/ChapterContext'

const Header = () => {
	const { selectedSectionData, selectedChapterData, } = useContext(ChapterContext)
	
	return (
		selectedChapterData 
			? selectedChapterData.name
			: selectedSectionData
				? selectedSectionData.name
				: "Welcome"
		
	)
}

export default Header