import React, {PropTypes} from 'react'
import { RecipeCard } from '../recipe-card/recipe-card'
import './recipe-list.scss'

class RecipeList extends React.Component {

	componentWillMount() {
		this.props.fetchRecipes()
		this.props.sessionCheckStatus()
	}

	render() {
		const {recipes, session} = this.props;
		return <div className='recipe-list'>
			{recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} isLoggedIn={session && session.isLoggedIn} />)}
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
