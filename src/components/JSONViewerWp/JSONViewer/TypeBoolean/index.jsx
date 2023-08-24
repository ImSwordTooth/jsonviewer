import React from 'react';
import PropTypes from 'prop-types';
import { StyledTypeBoolean } from './style';

export const TypeBoolean = (props) => {
	const { boolean } = props;

	return (
		<StyledTypeBoolean>{boolean.toString()}</StyledTypeBoolean>
	);
};

TypeBoolean.propTypes = {
	boolean: PropTypes.bool
};
