import React, {useEffect, useState} from 'react';
import {StyledApp} from './style';
import {Setting} from './Setting';
import {TestJsonList} from './Setting/Json/TestJson';
// import {JSONViewerWp} from './components/JSONViewerWp';
import { message, ConfigProvider } from 'antd'
// import JSONViewerWp from '@swordtooth/json-viewer';
// import JSONViewer from '@swordtooth/json-viewer'
import JSONViewer from '../../src/App'

const App = () => {

	const [ settingData, setSettingData ] = useState({
		json: TestJsonList[0],
		width: '600px',
		height: '600px',
		isShowLineNumber: true,
		canCollapse: true,
		isShowCopy: true,
		copyText: 'data 是个 json，这是转义结果：',
		isShowFooter: true,
		isEmptyObjectOneLine: false
	})

	return (
		<ConfigProvider theme={{
			token: {
				colorPrimary: '#2246ff'
			}
		}}>
			<StyledApp>
				<div className="leftPart">
					<Setting settingData={settingData} updateSetting={setSettingData}></Setting>
				</div>
				<div className="rightPart">
					<div className="jsonviewerWp">
						<JSONViewer
							json={settingData.json}
							width={settingData.width}
							height={settingData.height}
							isShowLineNumber={settingData.isShowLineNumber}
							canCollapse={settingData.canCollapse}
							isShowCopy={settingData.isShowCopy}
							onCopy={(data) => message.success(`${settingData.copyText}${JSON.stringify(data)}`)}
							isShowFooter={settingData.isShowFooter}
							isEmptyObjectOneLine={settingData.isEmptyObjectOneLine}
						/>
					</div>
				</div>
			</StyledApp>
		</ConfigProvider>
	);
};

export default App;
