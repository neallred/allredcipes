import React from 'react'
import './search.scss';

const cB = 'search'
export const Search = ({
	searchToggle,
	searchHandleText,
	search={},
	headerHeight
}) => {

	return <div className={cB} style={{marginTop: headerHeight + 15}}>
		<h1 className={`${cB}__title`}>Allred Recipe Box</h1>
		<h4 className={`${cB}__sub-title`}>Search recipes by:</h4>
		<form className={`${cB}__form`}>
			{
				Object.keys(search).map((term) => {
					const searchTermValue = search && (search[term] !== undefined) ? search[term] : ''
					const inputValue = Array.isArray(searchTermValue) ? search[term].join(' ') : ''
					const labelName = term.split('_')[1].toLowerCase()

					return <div className={`${cB}__line`} key={term}>
						<div className={`${cB}__term`}>
							<label className={`${cB}__label`}>{labelName}
								<input className={`${cB}__checkbox`}
									type="checkbox"
									onChange={() => {searchToggle(term, searchTermValue)}}
									name="search-by"
									checked={!!search[term]} />
							</label>
						</div>
						{searchTermValue && <input className={`${cB}__text`}
							type='text'
							onChange={(e) => {searchHandleText(term, e.target.value)}}
							searchTermValue={inputValue}/>}
					</div>
				})
			}
		</form>
	</div>
};
