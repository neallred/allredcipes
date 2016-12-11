import React from 'react'

export const Search = ({
	searchToggle,
	searchHandleText,
	searchBy={
		SEARCH_BY_CONTRIBUTOR: false,
		SEARCH_BY_INGREDIENTS: ['baked', 'goods'],
		SEARCH_BY_INSTRUCTIONS: false,
		SEARCH_BY_NAME: false //can be false, true, or ['v', 'a', 'l', 'u', 'e', 's']
	}
}) => {
	return <form className="search">
		{
			Object.keys(searchBy).map((term) => {
				const labelName = term.split('_')[2].toLowerCase()
				const value = (Array.isArray(searchBy && searchBy[term])) ? searchBy[term] : searchBy
				const inputValue = Array.isArray(value) ? searchBy[term].join(' ') : (searchBy || '')

				return <label key={term} className="search__label">{labelName}
					<input className="search__checkbox" type="checkbox" onChange={() => {searchToggle(term, )}} name="search-by" checked={searchBy[term]} />
						{value && <input className="search__text" type='text' onChange={(e) => {onChange(e)}} value={inputValue}/>}
					</label>
			})
		}
	</form>
};
