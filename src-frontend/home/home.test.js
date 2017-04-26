import React from 'react';
import {shallow} from 'enzyme';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';

import 'ignore-styles'
import register from 'ignore-styles'
register(['.sass', '.scss'])


const test = addAssertions(tape, {jsxEquals});

import {HomeComponent} from './home';
import RecipeList from '../recipe-list/recipe-list'
import { HeaderContainer } from '../header/header-container'
import { SearchContainer } from '../search/search-container'

test('test of stuff', (t) => {
	const props = {
		session: true,
		updateFields: {}
	};

    const wrapper2 = shallow(<HomeComponent {...props} />);
    console.log(wrapper2);

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

  //t.end();
});
