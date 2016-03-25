import React from 'react';
export class Recipe extends React.Component {
  // forEach method, could be shipped as part of an Object Literal/Module
  constructor(props) {
    super(props);
    this.state = {
      updated: false
    }
  }
  removeRecipe (e) {
    e.stopPropagation();
    let data = window.localStorage;
    data.removeItem(this.props.value);
    let toRemove = e.currentTarget.parentNode.parentNode.parentNode;
    console.log(toRemove);
    toRemove.parentNode.removeChild(toRemove);
  }
  toggleIngredients (e) {
    var nodeListForEach = function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
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
    let data = window.localStorage;
    let value = this.props.value;
    let key = this.props.key;
    return <div className='recipe' key={key} onClick={this.toggleIngredients.bind(this)}>
      <div className='row heading'>
        <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
          <h3>{JSON.parse(data[value]).name}</h3>
        </div>
        <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2' onClick={this.toggleIngredients.bind(this)}>
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
          <ul key={key}>
            {JSON.parse(data[value]).ingredients.map(function(value2, key2){
              return <li className='ingredient' key={key2}>{value2}</li> 
            })}
          </ul>
        </div>
        <div className='col-lg-12'>
          <p className='instructions heading'><strong>Instructions:</strong></p>
        </div>
        <div className='col-lg-12'>
          <p className='instructions'>{JSON.parse(data[value]).instructions}</p>
        </div>
        <li className='btn btn-warning edit'>Edit</li>
      </div>
    </div>
  }
}
