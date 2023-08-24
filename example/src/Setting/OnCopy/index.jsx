import React from 'react'
import PropTypes from 'prop-types'
import { StyledOnCopy } from './style'
import { TextField } from '@mui/material'

export const OnCopy = (props) => {
	const { text, updateSetting } = props

	return (
		<StyledOnCopy>
			<div className="comment">// 点击复制按钮后的回调，需配合 isShowCopy 👆🏻，复制到剪切板的功能已集成在组件里</div>
			onCopy={'{'}
			<div className="function">
				(data) => message.success(`<TextField size="small" variant="standard" color="warning" focused value={text} onChange={(e) => updateSetting(e.target.value)} style={{ width: '240px'}} />${`{`}JSON.stringify(data){'}'}`)
			</div>

			{'}'}
		</StyledOnCopy>
	)
}

OnCopy.propTypes = {
	text: PropTypes.string,
	updateSetting: PropTypes.func
}
