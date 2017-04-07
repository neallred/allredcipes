import React from 'react';
export const RecipeSubsection = ({dataToSanitize, sectionTitle}) => {
	const sanitizeData = data => {

		if (!data) { return null; }

		return data.replace(/[<>]/g, '');
	};

	const listifyString = string => {
		if (!string || typeof string !== 'string') { return null; }
		return string.replace(/(?:\r\n|\r|\n)/g, '</li><li class="recipe__list-item">');
	};

	const listWrapper = htmlBlob => htmlBlob && `<li class='recipe__list-item'>${htmlBlob}</li>`

	const htmlBlob = listWrapper(listifyString(sanitizeData((dataToSanitize || ''))));

	return <div>
		<p className='recipe__subsection__heading'><strong>{sectionTitle}:</strong></p>
		<ul className='recipe__list' dangerouslySetInnerHTML={{__html: htmlBlob}}/>
	</div>
}
