import React from 'react';
export const RecipeSubsection = ({dataToSanitize, sectionTitle}) => {
	const sanitizeData = data => {
		if (!data) { return null; }
		return data.replace(/[<>]/g, '');
	};
	const listifyString = string => {
		if (!string || typeof string !== 'string') { return null; }
		return string.replace(/(?:\r\n|\r|\n)/g, '</li><li class="item">');
	};
	const listWrapper = htmlBlob => {
		if (!htmlBlob) { return null; }
		return `<li class='item'>${htmlBlob}</li>`;
	};

	const htmlBlob = listWrapper(listifyString(sanitizeData((dataToSanitize || ''))));
	return <div>
		<p className='recipe-subsection-heading'><strong>{sectionTitle}:</strong></p>
		<ul dangerouslySetInnerHTML={{__html: htmlBlob}}/>
	</div>
}
