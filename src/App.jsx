import React from 'react';
import { Header } from './Header.jsx';
import { OwnRecipes } from './OwnRecipes.jsx';
import { OtherRecipes } from './OtherRecipes.jsx';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe_to_edit: '',
      searchRecipeBy: '',
      searchRecipeValue: ''
    }
  }
  handleEditing (e) {
    if(e.target.className === 'btn btn-warning edit'){
      this.setState({recipe_to_edit: e.target.id});
      let modalDialog = document.getElementById('dialog');
      modalDialog.className = 'modalDialog opened';
    } else if (e.target.className === 'close-edit-box'){
      this.setState({recipe_to_edit: ''});
      let modalDialog = document.getElementById('dialog');
      modalDialog.className = 'modalDialog';
    }
  }
  render () {
    let recipe_id=this.state.recipe_to_edit;
    let savedRecipe = JSON.parse(window.localStorage.getItem(recipe_id));
    return  <div className='container'
      onClick={this.handleEditing.bind(this)}>
      <div className='col-lg-9 col-lg-offset-3'>
        <Header/>
        <div>{this.props.children}</div>
      </div>
    </div>
  }
}
