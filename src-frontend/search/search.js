import React from 'react'
import './search.scss';

const cB = 'search'
export const Search = ({
	searchToggleType,
	searchUpdateTerms,
	search={},
	headerHeight
}) => {
	return <div className={cB} style={{marginTop: Math.floor(15 + parseFloat(headerHeight, 10)) || 15}}>
		<h1 className={`${cB}__title`}>Allred Recipe Box</h1>
		<h4 className={`${cB}__sub-title`}>Search recipes by:</h4>
		<form className={`${cB}__form`}>
			{
				Object.keys(search).map(type => {
					return <div className={`${cB}__line`} key={type}>
						<div className={`${cB}__term`}>
							<label className={`${cB}__label`}>{search[type].displayField}
								<input className={`${cB}__checkbox`}
									type="checkbox"
									onClick={() => {searchToggleType(type)}}
									name="search-by"
									checked={search[type].enabled} />
							</label>
						</div>
						{search[type].enabled && <input className={`${cB}__text`}
							type='text'
							onChange={(e) => {searchUpdateTerms(type, e.target.value)}}
							value={search[type].terms} />}
					</div>
				})
			}
		</form>
	</div>
};
