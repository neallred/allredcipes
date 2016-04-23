import React from 'react'
export const RecipeSubsection = ({ingredients, instructions, author, dataToSanitize, sectionTitle}) => {
  let sanitizeData = (data) => {
    return data
      .replace(/[<>]/g, '')
      .replace(/(?:\r\n|\r|\n)/g, '</li><li class="item">')
  }
  return <div>
    <p className='recipe-subsection-heading'><strong>{sectionTitle}:</strong></p>
    <ul>
      <li
        className='item'
        dangerouslySetInnerHTML={{__html: sanitizeData(dataToSanitize)}}/>
    </ul>
  </div>
}
