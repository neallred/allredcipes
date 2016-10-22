import React from 'react'
export const RecipeSubsection = ({dataToSanitize, sectionTitle}) => {
	const sanitizeData = data => { return data.replace(/[<>]/g, '') };
	const listifyString = string => {return string.replace(/(?:\r\n|\r|\n)/g, '</li><li class="item">') };
	const listWrapper = htmlBlob => { return `<li class='item'>${htmlBlob}</li>` };
	return <div>
		<p className='recipe-subsection-heading'><strong>{sectionTitle}:</strong></p>
		<ul dangerouslySetInnerHTML={{__html: listWrapper(listifyString(sanitizeData(dataToSanitize)))}}/>
	</div>
}
