import React from 'react'
export const RecipeSubsection = ({ingredients, instructions, author, dataToSanitize, sectionTitle}) => {
  let sanitizeData = (data) => {
    return data
      .replace(/[<>]/g, '')
  }
  let listifyString = (string) => {
    return string.replace(/(?:\r\n|\r|\n)/g, '</li><li class="item">')
  }
  let listWrapper = (htmlBlob) => {
    return "<li class='item'>"+htmlBlob+"</li>"
  }
  return <div>
    <p className='recipe-subsection-heading'><strong>{sectionTitle}:</strong></p>
    <ul dangerouslySetInnerHTML={{__html: listWrapper(listifyString(sanitizeData(dataToSanitize)))}}/>
  </div>
}
