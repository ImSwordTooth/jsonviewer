import React from 'react';
import PropTypes from 'prop-types';
import { StyledTypeNumber } from './style';

export const TypeNumber = (props) => {
	const { number } = props;

	return (
		<StyledTypeNumber>{number}</StyledTypeNumber>
	);
};

TypeNumber.propTypes = {
	number: PropTypes.number
};
