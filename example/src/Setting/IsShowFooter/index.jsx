import React from 'react';
import { Switch } from '@mui/material';
import PropTypes from 'prop-types';

export const IsShowFooter = (props) => {

	const { isShow, updateSetting } = props;

	return (
		<div>
			<div className="comment">// 是否显示底部结构</div>
			isShowFooter={'{'}<Switch checked={isShow} onChange={e => updateSetting(e.target.checked)} />{'}'}
		</div>
	);
};

IsShowFooter.propTypes = {
	isShow: PropTypes.bool,
	updateSetting: PropTypes.func
};
