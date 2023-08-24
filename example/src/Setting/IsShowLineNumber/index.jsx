import React from 'react'
import { Switch } from '@mui/material';
import PropTypes from 'prop-types'

export const IsShowLineNumber = (props) => {

	const { isShow, updateSetting } = props

	return (
		<div>
			<div className="comment">// 是否显示行号</div>
			isShowLineNumber={'{'}<Switch checked={isShow} onChange={e => updateSetting(e.target.checked)} />{'}'}
		</div>
	)
}

IsShowLineNumber.propTypes = {
	isShow: PropTypes.bool,
	updateSetting: PropTypes.func
}
