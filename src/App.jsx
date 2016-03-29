import React from 'react';
import { RecipeDisplay } from './RecipeDisplay.jsx';
import { RecipeCreate } from './RecipeCreate.jsx';
import { RecipeEdit } from './RecipeEdit.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_to_edit: ''
    }
  }
  editRequest (e) {
    if(e.target.className === 'btn btn-warning edit'){
      this.setState({recipe_to_edit: e.target.id});
      let modalDialog = document.getElementById('dialog');
      modalDialog.className = 'modalDialog opened';
    }
  }
  cancelEditRequest(e){
    if(e.target.className === 'close-edit-box'){
      this.setState({recipe_to_edit: ''});
      let modalDialog = document.getElementById('dialog');
      modalDialog.className = 'modalDialog';
    }
  }
  render () {
    let recipe_id=this.state.recipe_to_edit;
    let savedRecipe = JSON.parse(window.localStorage.getItem(recipe_id));
    return <div className='container' onClick={this.cancelEditRequest.bind(this)}>
      <div className='col-lg-9 col-lg-offset-3' onClick={this.editRequest.bind(this)}>
      <h1>Allreds Recipe Box</h1>
      <RecipeDisplay />
      <RecipeCreate/>
      <RecipeEdit
        recipe_id={recipe_id}
        saved_recipe={savedRecipe}/>
    </div>
    </div>
  }
}
