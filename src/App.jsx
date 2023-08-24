import React from 'react';
import {JSONViewerWp} from './components/JSONViewerWp';
import { message } from 'antd'

const App = (props) => {
	const { json, width, height, isShowLineNumber, canCollapse, isShowCopy, onCopy, isShowFooter, isEmptyObjectOneLine } = props

	return (
		<JSONViewerWp
			json={json}
			width={width}
			height={height}
			isShowLineNumber={isShowLineNumber}
			canCollapse={canCollapse}
			isShowCopy={isShowCopy}
			onCopy={onCopy}
			isShowFooter={isShowFooter}
			isEmptyObjectOneLine={isEmptyObjectOneLine}
		/>
	)
};

export default App;
