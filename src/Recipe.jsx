import React from 'react';
export class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false
    }
  }
  removeRecipe (e) {
    e.stopPropagation();
    let recipeStore = window.localStorage;
    recipeStore.removeItem(this.props.recipe_id);
    let toRemove = e.currentTarget.parentNode.parentNode.parentNode;
    toRemove.parentNode.removeChild(toRemove);
  }
  toggleIngredientView (e) {
    var nodeListForEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    };
    let divs = document.querySelectorAll('div.ingredients');
    nodeListForEach(divs, function(index,value){
      value.className='ingredients hide-ingredients'
    });
    let div = e.currentTarget.querySelector('div.ingredients');
    if(div && div.className === 'ingredients hide-ingredients'){
      div.className = 'ingredients show-ingredients';
    } else {
      div.className = 'ingredients hide-ingredients';
    }
  }
  render () {
    let recipeStore = window.localStorage;
    let recipe_id = this.props.recipe_id;
    let recipeJSON = JSON.parse(recipeStore[recipe_id]);
    let key = this.props.key;
    return <div className='recipe' key={key} onClick={this.toggleIngredientView.bind(this)}>
      <div className='row heading'>
        <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
          <h3>{recipeJSON.name}</h3>
        </div>
        <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2' onClick={this.toggleIngredientView.bind(this)}>
          <button className=' btn btn-danger'
            type='submit' 
            onClick={this.removeRecipe.bind(this)}
            >X</button>
        </div>
      </div>
      <div className='ingredients hide-ingredients'>
        <div className='col-lg-12'>
          <p className='ingredient-list'><strong>Ingredients:</strong></p>
        </div>
        <div className='col-lg-12'>
          <p className='instructions' dangerouslySetInnerHTML={{__html: '<ul><li class="ingredient">' + recipeJSON.ingredients.replace(/[<>]/g, '').replace(/(?:\r\n|\r|\n)/g, '</li><li class="ingredient">') + '</li></ul>'}} />
        </div>
        <div className='col-lg-12'>
          <p className='instructions heading'><strong>Instructions:</strong></p>
        </div>
        <div className='col-lg-12'>
          <p className='instructions' dangerouslySetInnerHTML={{__html: '<ul><li class="ingredient">' + recipeJSON.instructions.replace(/[<>]/g, '').replace(/(?:\r\n|\r|\n)/g, '</li><li class="ingredient">') + '</li></ul>'}} />
        </div>
        <li className='btn btn-warning edit' id={recipe_id}>Edit</li>
      </div>
    </div>
  }
}
