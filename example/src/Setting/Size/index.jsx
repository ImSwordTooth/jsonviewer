import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import { StyledSize } from './style';

export const Size = (props) => {
	const { prop, value, updateSetting } = props;
	const [ unit, setUnit ] = useState('px');
	const [ number, setNumber ] = useState(0);

	const handleInput = (e) => {
		updateSetting(`${e.target.value}${unit}`);
	};

	useEffect(() => {
		if (/px$/.test(value)) {
			setUnit('px');
			setNumber(Number(value.replace('px', '')));
		} else if (/%$/.test(value)) {
			setUnit('%');
			setNumber(Number(value.replace('%', '')));
		}
	}, [prop, value]);

	return (
		<StyledSize>
			<div className="comment">// {prop === 'width' ? '宽度' : '高度，实际上是“最高高度”'}</div>
			<div className="content">
				{prop}={'{'}
				<div className="operate">
					{/*<Segmented*/}
					{/*	value={unit}*/}
					{/*	options={[ 'px', '%' ]}*/}
					{/*	size="small"*/}
					{/*	onChange={setUnit}*/}
					{/*/>*/}
					<TextField
						InputProps={{
							endAdornment: <InputAdornment position="end">px</InputAdornment>,
						}}
						size="small" label={prop} value={number} style={{ width: '120px' }} onChange={handleInput} />
				</div>
				{'}'}
			</div>

		</StyledSize>
	);
};

Size.propTypes = {
	prop: PropTypes.oneOf(['width', 'height']),
	value: PropTypes.string,
	updateSetting: PropTypes.func
};
