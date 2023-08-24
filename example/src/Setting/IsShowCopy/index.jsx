import React from 'react'
import { Switch } from '@mui/material'
import PropTypes from 'prop-types'

export const IsShowCopy = (props) => {

	const { isShow, updateSetting } = props

	return (
		<div>
			<div className="comment">// 是否显示复制按钮</div>
			isShowCopy={'{'}<Switch checked={isShow} onChange={e => updateSetting(e.target.checked)} />{'}'}
		</div>
	)
}

IsShowCopy.propTypes = {
	isShow: PropTypes.bool,
	updateSetting: PropTypes.func
}
