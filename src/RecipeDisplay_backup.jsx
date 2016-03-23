import React from 'react';

export class RecipeDisplay extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  removeRecipe () {
    return console.log(window.localStorage);
  }
  logger = () => {
    console.log('boo');
  }
  subrender () {
  }
  render () {
    let data = window.localStorage;
    return <div>
      {Object.keys(data).map(function(value, key) {
        return ( value.indexOf('recipe_') !== -1 ?
          <div className='recipe' key={key}>
            <div className='row'>
              <div className='col-lg-8 col-md-8 col-sm-8 col-xs-8'>
                <h3 >{JSON.parse(data[value]).name}</h3>
              </div>
              <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2'>
                <button className=' btn btn-danger'
                  type='submit' 
                  id={value}
                   onClick={logger.apply(logger)}>X</button>
              </div>
            </div>
            <div className='col-lg-12'>
              <p>Ingredients:</p>
            </div>
            <ul key={key}>
              {JSON.parse(data[value]).ingredients.map(function(value2, key2){
                return <li key={key2}>{value2}</li> 
              })}
            </ul>
          </div>
        :
          null
        );
        }) 
      }  
    </div>
  }
}
