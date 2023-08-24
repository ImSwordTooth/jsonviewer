import React from 'react';
import PropTypes from 'prop-types';
import { StyledSetting } from './style'
import {Input, Switch} from 'antd';
import {Json} from './Json';
import {IsShowLineNumber} from './IsShowLineNumber';
import {IsShowCopy} from './IsShowCopy';
import { CanCollapse } from './CanCollapse'
import {OnCopy} from './OnCopy';
import {IsShowFooter} from './IsShowFooter';
import {Size} from './Size';
import {IsEmptyObjectOneLine} from './IsEmptyObjectOneLine'

const { TextArea } = Input

export const Setting = (props) => {
	const { settingData, updateSetting } = props
	const { json, isShowLineNumber, canCollapse, isShowCopy, copyText, isShowFooter, width, height, isEmptyObjectOneLine } = settingData

	const update = (prop, value) => {
		updateSetting({
			...settingData,
			[prop]: value
		})

		console.log({
			...settingData,
			[prop]: value
		})
	}

	return (
		<StyledSetting>
			<div>{'<JSONViewer'}</div>
			<div className="props">
				<Json json={json} updateSetting={(data) => update('json', data) } />
				<Size prop="width" value={width} updateSetting={(data) => update('width', data)} />
				<Size prop="height" value={height} updateSetting={(data) => update('height', data)} />
				<IsShowLineNumber isShow={isShowLineNumber} updateSetting={(data) => update('isShowLineNumber', data)} />
				<CanCollapse can={canCollapse} updateSetting={(data) => update('canCollapse', data)} />
				<IsShowCopy isShow={isShowCopy} updateSetting={(data) => update('isShowCopy', data)} />
				<OnCopy text={copyText} updateSetting={(data) => update('copyText', data)} />
				<IsShowFooter isShow={isShowFooter} updateSetting={(data) => update('isShowFooter', data)} />
				<IsEmptyObjectOneLine isShow={isEmptyObjectOneLine} updateSetting={(data) => update('isEmptyObjectOneLine', data)} />
			</div>
			<div>{'/>'}</div>
		</StyledSetting>
	)
}

Setting.propTypes = {
	settingData: PropTypes.object,
	updateSetting: PropTypes.func
}
