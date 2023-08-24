import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../context';
import { StyledFooter } from './style';
import { message } from 'antd';

export const Footer = (props) => {
	const { footerArr, json } = props;
	const { setCurrentLine } = useContext(GlobalContext);

	const getKeyIndexInJSON = (key, json) => {
		let length = 0;

		for (let i in json) {
			if (i === String(key)) {
				break;
			}

			const item = json[i];
			switch (typeof item) {
				case 'string':
				case 'number':
				case 'boolean': length += 1; break;
				case 'object': {
					if (!item) {
						length += 1;
					} else {
						if (Array.isArray(item)) {
							length += getJsonAllExpendLength(item);
						} else {
							length += getJsonAllExpendLength(item);
						}
					}
				}
			}
		}

		return length + 1;
	};

	const getJsonAllExpendLength = (currentJson = json) => {
		let length = 0;

		for (let i in currentJson) {
			const item = currentJson[i];
			switch (typeof item) {
				case 'string':
				case 'number':
				case 'boolean': length += 1; break;
				case 'object': {
					if (!item) {
						length += 1;
					} else {
						if (Array.isArray(item)) {
							length += getJsonAllExpendLength(item);
						} else {
							length += getJsonAllExpendLength(item);
						}
					}
				}
			}
		}

		return length + 2;
	};

	const handleClick = (i) => {
		if (i === footerArr.length - 1) {
			return;
		}
		let index = 1;
		let currentJSON = json;
		for (let item of footerArr.slice(0, i + 1)) {
			index += getKeyIndexInJSON(item, currentJSON);
			currentJSON = currentJSON[item];
		}
		setCurrentLine(index);
	};

	const handleCopy = () => {
		let res = '';
		for (let node of footerArr) {
			if (/\d+/g.test(node)) {
				res = `${res.replace(/\.$/g, `[${node}].`)}`;
			} else {
				res += `${node}.`;
			}
		}
		res = res.replace(/\.$/g, '');

		const tag = document.createElement('input');
		tag.setAttribute('id', 'cp_hgz_input');
		tag.value = res;
		document.body.appendChild(tag);
		tag.select();
		document.execCommand('copy');
		document.body.removeChild(tag);
		message.success(`已复制路径：${res}`);
	};

	return (
		<StyledFooter>
			{
				footerArr.map((item, index) => {
					return (
						<div className="footerItem" key={index} onClick={() => handleClick(index)}>{item}</div>
					);
				})
			}
			<div className="copy" onClick={handleCopy}>
				<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
					<path d="M247.466667 706.133333C200.533333 680.533333 170.666667 631.466667 170.666667 576V298.666667c0-83.2 66.133333-149.333333 149.333333-149.333334h277.333333c55.466667 0 104.533333 29.866667 130.133334 76.8 29.866667 4.266667 55.466667 14.933333 78.933333 29.866667-19.2-98.133333-106.666667-170.666667-209.066667-170.666667H320C202.666667 85.333333 106.666667 181.333333 106.666667 298.666667v277.333333c0 102.4 72.533333 189.866667 170.666666 209.066667-14.933333-23.466667-25.6-49.066667-29.866666-78.933334z" />
					<path d="M704 896H426.666667c-117.333333 0-213.333333-96-213.333334-213.333333V405.333333c0-117.333333 96-213.333333 213.333334-213.333333h277.333333c117.333333 0 213.333333 96 213.333333 213.333333v277.333334c0 117.333333-96 213.333333-213.333333 213.333333zM426.666667 256c-83.2 0-149.333333 66.133333-149.333334 149.333333v277.333334c0 83.2 66.133333 149.333333 149.333334 149.333333h277.333333c83.2 0 149.333333-66.133333 149.333333-149.333333V405.333333c0-83.2-66.133333-149.333333-149.333333-149.333333H426.666667z" />
					<path d="M695.466667 490.666667H448c-17.066667 0-32-14.933333-32-32S430.933333 426.666667 448 426.666667h247.466667c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32zM695.466667 661.333333H448c-17.066667 0-32-14.933333-32-32S430.933333 597.333333 448 597.333333h247.466667c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z" />
				</svg>
			</div>
		</StyledFooter>
	);
};

Footer.propTypes = {
	footerArr: PropTypes.array,
	json: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
