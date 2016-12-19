import React from 'react'
import './search.scss';

export const Search = ({
	searchToggle,
	searchHandleText,
	search={},
	headerHeight
}) => {

	return 	<div className='search' style={{marginTop: headerHeight + 15}}>
		<h1 className='search__title'>Allred Recipe Box</h1>
		<h4 className='search__sub-title'>Search recipes by:</h4>
		<form className="search__form">
			{
				Object.keys(search).map((term) => {
					const searchTermValue = search && (search[term] !== undefined) ? search[term] : ''
					const inputValue = Array.isArray(searchTermValue) ? search[term].join(' ') : ''
					const labelName = term.split('_')[1].toLowerCase()

					return <div className="search__line" key={term}>
						<div className="search__term">
							<label className="search__label">{labelName}
								<input className="search__checkbox"
									type="checkbox"
									onChange={() => {searchToggle(term, searchTermValue)}}
									name="search-by"
									checked={!!search[term]} />
							</label>
						</div>
						{searchTermValue && <input className="search__text"
							type='text'
							onChange={(e) => {searchHandleText(term, e.target.value)}}
							searchTermValue={inputValue}/>}
					</div>
				})
			}
		</form>
	</div>
};
