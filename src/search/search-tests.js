import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import createComponent from 'react-unit';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';

import 'ignore-styles'
import register from 'ignore-styles'
register(['.sass', '.scss'])

const test = addAssertions(tape, {jsxEquals});

import Home from './home';

test('', (t) => {
	const props = {
		session: true,
		updateFields: {}
	};

	const component = createComponent.shallow(<Home {...props} />);

	t.equal(
		component.props.session,
		true,
		'Session should be true when passed in as true'
	);

	t.end();
});
