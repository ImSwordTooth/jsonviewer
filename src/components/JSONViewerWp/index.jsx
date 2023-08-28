import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {JSONViewer} from './JSONViewer';
import { GlobalContext } from '../context';
import { StyledWp } from './style';
import {Footer} from './Footer';

export const JSONViewerWp = (props) => {
	const { json, isShowLineNumber, canCollapse, isShowCopy, onCopy, isShowFooter, width, height, isEmptyObjectOneLine } = props

	const [ footerArr, setFooterArr ] = useState([]);
	const [ currentLine, setCurrentLine ] = useState('');

	const handleCopy = () => {
		const tag = document.createElement('input');
		tag.setAttribute('id', 'cp_hgz_input');
		tag.value = JSON.stringify(json);
		document.body.appendChild(tag);
		tag.select();
		document.execCommand('copy');
		document.body.removeChild(tag);
		onCopy(json);
	};

	return (
		<GlobalContext.Provider value={{ isShowLineNumber, canCollapse, onCopy, footerArr, setFooterArr, isShowFooter, currentLine, setCurrentLine, height, isEmptyObjectOneLine }}>
			<StyledWp style={{ width, maxHeight: height }}>
				{
					isShowCopy &&
					<div className="copy" onClick={handleCopy}>
						<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
							<path d="M247.466667 706.133333C200.533333 680.533333 170.666667 631.466667 170.666667 576V298.666667c0-83.2 66.133333-149.333333 149.333333-149.333334h277.333333c55.466667 0 104.533333 29.866667 130.133334 76.8 29.866667 4.266667 55.466667 14.933333 78.933333 29.866667-19.2-98.133333-106.666667-170.666667-209.066667-170.666667H320C202.666667 85.333333 106.666667 181.333333 106.666667 298.666667v277.333333c0 102.4 72.533333 189.866667 170.666666 209.066667-14.933333-23.466667-25.6-49.066667-29.866666-78.933334z" />
							<path d="M704 896H426.666667c-117.333333 0-213.333333-96-213.333334-213.333333V405.333333c0-117.333333 96-213.333333 213.333334-213.333333h277.333333c117.333333 0 213.333333 96 213.333333 213.333333v277.333334c0 117.333333-96 213.333333-213.333333 213.333333zM426.666667 256c-83.2 0-149.333333 66.133333-149.333334 149.333333v277.333334c0 83.2 66.133333 149.333333 149.333334 149.333333h277.333333c83.2 0 149.333333-66.133333 149.333333-149.333333V405.333333c0-83.2-66.133333-149.333333-149.333333-149.333333H426.666667z" />
							<path d="M695.466667 490.666667H448c-17.066667 0-32-14.933333-32-32S430.933333 426.666667 448 426.666667h247.466667c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32zM695.466667 661.333333H448c-17.066667 0-32-14.933333-32-32S430.933333 597.333333 448 597.333333h247.466667c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z" />
						</svg>
					</div>
				}
				<JSONViewer json={json} />
				{
					isShowFooter &&
					<Footer footerArr={footerArr} json={json}></Footer>
				}
			</StyledWp>
		</GlobalContext.Provider>
	);
};

JSONViewerWp.propTypes = {
	json: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	width: PropTypes.string,
	height: PropTypes.string,
	canCollapse: PropTypes.bool,
	isShowLineNumber: PropTypes.bool,
	isShowCopy: PropTypes.bool,
	onCopy: PropTypes.func,
	isShowFooter: PropTypes.bool,
	isEmptyObjectOneLine: PropTypes.bool
};

JSONViewerWp.defaultProps = {
	canCollapse: true,
	isShowLineNumber: true,
	isShowCopy: true,
	onCopy: () => {},
	isShowFooter: true,
	isEmptyObjectOneLine: false
}
