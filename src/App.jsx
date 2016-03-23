import React from 'react';
import { RecipeDisplay } from './RecipeDisplay.jsx';
import { RecipeCreate } from './RecipeCreate.jsx';

export class App extends React.Component {
  render () {
    return <div>
      <h1>Free Code Camp Recipe Box</h1>
      <RecipeDisplay/>
      <RecipeCreate/>
    </div>
  }
}

/*
export class RecipeBox extends React.Component{
  <RecipeDisplay
  />
  <RecipeCreate/>
}

export class Recipe extends React.Component{
  render () {
    let key = this.props.key
    let name = this.props.name
    let ingredients = this.props.ingredients
    return (
      <div>
        <h3 className='partner'>{name}</h3>
        <span className='partner' onClick={*//*delete action here*//*}>X</span>
        <ul key={key}>
          <Ingredient ingredients={ingredients} />
        </ul>
      </div>
    );
  }
}
  
export class Ingredient extends React.Component{
  render () {
    return (
      {.map(key,val){
        <li>{val}</li>
      }}
    );
  }
}

export class RecipeCreate extends React.Component{
}

export class RecipeDisplay extends React.Component{
  render () {
    return  (
      {localStorage.map(key,val){
        <Recipe
          key={key}
          name={val.name}
          ingredients={val.ingredients}
        />
      }}
    );
  }
}
*/





/*
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
           type="text"
           placeholder="Say something..."
           value={this.state.text}
           onChange={this.handleTextChange}
         />
         <input type="submit" value="Post" />
       </form>
     );
   }
});
*/





/*
export class List extends React.Component {
  render () {
    return <ul>
      {this.props.recipes.map(function(item) {
        return <li key={item}>{item}</li>
        })
      }
    </ul>
  }
}
*/


/*
  constructor(props) {
    super(props);
    this.state = {
      count: 5
    };
  };
  incrementCount () {
    this.setState({
      count: this.state.count + 1
    });
  };
	render () {
    return <div>
      <h1>Count: {this.state.count}</h1>
      <button type='button' onClick = {this.incrementCount.bind(this)}>Increment</button>
    </div>
	}
      */

