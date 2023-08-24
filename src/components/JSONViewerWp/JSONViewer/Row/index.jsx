import React, {useContext, useEffect, useRef} from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import PropTypes from 'prop-types';
import { StyledRow } from './style';

import { GlobalContext } from '../../../context';

export const Row = (props) => {
	const { children, className, style, collapsed, lineNumber, updateExpand, propStructure } = props;
	const { isShowLineNumber, canCollapse, setFooterArr, currentLine, setCurrentLine } = useContext(GlobalContext);

	const rowRef = useRef();

	const toggleExpand = () => updateExpand();

	const handleClick = () => {
		setCurrentLine(lineNumber);
	};

	useEffect(() => {
		if (currentLine === lineNumber) {
			setFooterArr(propStructure);
			scrollIntoView(rowRef.current, {
				scrollMode: 'if-needed',
				block: 'center',
				behavior: 'smooth'
			});
		}
	}, [currentLine]);

	const getToolbarStyle = () => {
		const style = {
			width: '48px',
		};
		if (!canCollapse && !isShowLineNumber) {

		} else {
			if (!canCollapse) {
				style.width = '26px';
				style.paddingRight = 0;
			}

			if (!isShowLineNumber) {
				style.width = '22px';
			}
		}

		return style;
	};

	return (
		<StyledRow ref={rowRef} onClick={handleClick} className={currentLine === lineNumber ? 'active' : ''}>
			<div className="toolbar" style={{ ...getToolbarStyle() }}>
				{
					isShowLineNumber &&
					<span className={`lineNumber ${lineNumber.toString().length > 2 ? 'long' : ''}`}>{lineNumber}</span>
				}

				{
					canCollapse && collapsed !== undefined &&
					<div className={`collapse ${collapsed ? '' : 'close'}`} onClick={() => toggleExpand()}>

						<svg version="1.1" width="18px" height="19px" viewBox="0 0 18.0 19.0" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<clipPath id="i0"><path d="M9,0 L18,9 L16.6,10.4 L9,2.79999998 L1.40000002,10.4 L0,9 L9,0 Z"></path></clipPath>
							</defs>
							<g transform="translate(14.200000007812502 0.20000000781249838) rotate(90.0)">
								<g clipPath="url(#i0)">
									<polygon points="0,0 18,0 18,10.4 0,10.4 0,0" stroke="none" fill="#9a95b2"></polygon>
								</g>
							</g>
						</svg>
					</div>
				}
			</div>

			<span className={`childrenWp ${className}`} style={style}>{children}</span>
		</StyledRow>
	);
};

Row.propTypes = {
	children: PropTypes.node,
	propStructure: PropTypes.array,
	className: PropTypes.string,
	style: PropTypes.object,
	collapsed: PropTypes.bool,
	lineNumber: PropTypes.number,
	updateExpand: PropTypes.func
}
