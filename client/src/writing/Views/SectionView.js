import React from 'react';

const SectionView = ({ sectionData: { id, name, description, order, text }}) => {
	return (
		<div>
			<h1>Section {order}: {name}</h1>
			<p>{description}</p>
			<p>{text}</p>
		</div>
	)
}

export default SectionView;