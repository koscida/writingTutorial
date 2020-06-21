import React from 'react';

const ChapterView = ({ chapterData: { id, name, description, order, sectionsCount }}) => {
	return (
		<div>
			<h1>Chapter {order}: {name}</h1>
			<p>{description}</p>
			<p>Subsections: {sectionsCount}</p>
		</div>
	)
}

export default ChapterView;