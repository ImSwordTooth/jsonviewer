import React, {useEffect, useState} from 'react';
import {Input, Select, message} from 'antd';
import PropTypes from 'prop-types'
import { StyledJson } from './style'
import { TestJsonList } from './TestJson'
import { Button } from '@mui/material'

const { TextArea } = Input
const { Option } = Select

export const Json = (props) => {
	const { json, updateSetting } = props

	const [ messageApi, contextHolder ] = message.useMessage()
	const [ changedJson, setChangedJson ] = useState(JSON.stringify(json))

	const selectJson = (value) => {
		updateSetting(TestJsonList[value])
		setChangedJson(JSON.stringify(TestJsonList[value]))
	}

	const handleChange = (e) => {
		setChangedJson(e.target.value)
	}

	const finishChange = () => {
		try {
			updateSetting(JSON.parse(changedJson))
		} catch (e) {
			messageApi.open({
				type: 'error',
				content: 'json 不合法',
				style: {
					position: 'absolute',
					left: '150px',
					top: '40px'
				}
			})
		}
	}

	return (
		<StyledJson>
			{contextHolder}
			<div className="comment">// 数据源</div>
			<div className="content">
				<span>json={'{'}</span>
				<div className="component">
					<div className="toolbar">
						预设 json：
						<Select labelInValue={false} defaultValue={0} style={{ width: '120px' }} size="small" onSelect={selectJson}>
							{
								TestJsonList.map((testJSON, index) => {
									return <Option value={index} key={index}>json{index + 1}</Option>;
								})
							}
						</Select>
					</div>
					<TextArea
						className="textArea"
						value={changedJson}
						rows={5}
						allowClear
						placeholder="可以在这里粘贴自己的 json"
						onChange={handleChange}
					/>
					<div className="buttonWp">
						<Button variant="contained" size="small" type="primary" shape="round" style={{ fontSize: '12px' }} onClick={finishChange}>应用</Button>
					</div>
				</div>
				{'}'}
			</div>

		</StyledJson>
	)
}

Json.propTypes = {
	json: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	updateSetting: PropTypes.func
}
