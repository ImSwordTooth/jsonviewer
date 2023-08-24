import React from 'react'
import { Switch } from '@mui/material';
import PropTypes from 'prop-types'

export const IsEmptyObjectOneLine = (props) => {

	const { isEmptyObjectOneLine, updateSetting } = props

	return (
		<div>
			<div className="comment">// 空对象或者空数组是否显示在一行</div>
			isEmptyObjectOneLine={'{'}<Switch checked={isEmptyObjectOneLine} onChange={e => updateSetting(e.target.checked)} />{'}'}
		</div>
	)
}

IsEmptyObjectOneLine.propTypes = {
	isEmptyObjectOneLine: PropTypes.bool,
	updateSetting: PropTypes.func
}
