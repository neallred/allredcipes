import React, {PropTypes} from 'react'
import { RecipeCard } from '../recipe-card/recipe-card'

class RecipeList extends React.Component {

	componentWillMount() {
		this.props.fetchRecipes();
	}

	render() {
		const {recipes} = this.props;
		return <div className='center-block'>
			{recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} isLoggedIn={this.props.session && this.props.session.isLoggedIn} />)}
		</div>
	}
}

RecipeList.propTypes = {
	recipes: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.any.isRequired,
		name: PropTypes.string.isRequired,
		ingredients: PropTypes.string,
		instructions: PropTypes.string,
		author: PropTypes.string
	}).isRequired).isRequired,
	onRecipeClick: PropTypes.func.isRequired
}

export {RecipeList}
