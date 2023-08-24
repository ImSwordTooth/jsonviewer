import React from 'react';
import { Switch } from '@mui/material';
import PropTypes from 'prop-types';

export const CanCollapse = (props) => {

	const { can, updateSetting } = props;

	return (
		<div>
			<div className="comment">// 是否开启折叠功能</div>
			canCollapse={'{'}<Switch checked={can} onChange={e => updateSetting(e.target.checked)} />{'}'}
		</div>
	);
};

CanCollapse.propTypes = {
	can: PropTypes.bool,
	updateSetting: PropTypes.func
};
