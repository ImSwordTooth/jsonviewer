import React from 'react';
import PropTypes from 'prop-types';
import { StyledTypeString } from './style';

export const TypeString = (props) => {
	const { string } = props;

	return (
		<StyledTypeString>"{string}"</StyledTypeString>
	);
};

TypeString.propTypes = {
	string: PropTypes.string
};
