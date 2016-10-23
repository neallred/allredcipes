import React, {PropTypes} from 'react'
import { RecipeCard } from '../recipe-card/recipe-card'

class RecipeList extends React.Component {

	componentWillMount() {
		this.props.fetchRecipes();
	}

	render() {
		const {recipes} = this.props;
		return <div className='center-block'>
			{recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)}
		</div>
	}
}

RecipeList.propTypes = {
	recipes: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		ingredients: PropTypes.string.isRequired,
		instructions: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired
	}).isRequired).isRequired,
	onRecipeClick: PropTypes.func.isRequired
}

export {RecipeList}