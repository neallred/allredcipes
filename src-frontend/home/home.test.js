import React from 'react';
import {shallow} from 'enzyme';
import tape from 'tape';

import register from 'ignore-styles'
register('.scss')


const test = tape;
	const props = {
		session: true,
		updateFields: {}
	};

import {HomeComponent} from './home';
import RecipeList from '../recipe-list/recipe-list'
import { HeaderContainer } from '../header/header-container'
import { SearchContainer } from '../search/search-container'
import { RecipeFormContainer } from '../recipe-form/recipe-form-container'

test('<Home/>', (t) => {

  t.test('should have a HeaderContainer, SearchContainer, and RecipeList', t => {
    const wrapper = shallow(<HomeComponent {...props} />);
    t.plan(3);
    t.equal(
      wrapper.find(HeaderContainer).length,
      1
    );
    t.equal(
      wrapper.find(SearchContainer).length,
      1
    );
    t.equal(
      wrapper.find(RecipeList).length,
      1
    );
  })

  t.test('displays form container when logged in', t => {
    const wrapper = shallow(<HomeComponent {...props} session={{isLoggedIn: true}}/>);
    t.plan(1);
    t.equal(
      wrapper.find(RecipeFormContainer).length,
      1
    );
  })

  t.test('hides form container when not logged in', t => {
    const wrapper = shallow(<HomeComponent {...props} session={{isLoggedIn: false}}/>);
    t.plan(1);
    t.equal(
      wrapper.find(RecipeFormContainer).length,
      0
    );
  })
});
