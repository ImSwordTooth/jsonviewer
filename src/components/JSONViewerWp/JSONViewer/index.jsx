import React, { useState, Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TypeString } from './TypeString';
import { TypeNumber } from './TypeNumber';
import { TypeBoolean } from './TypeBoolean';
import { TypeNull } from './TypeNull';
import { StyledJSONViewer } from './style';
import { Row } from './Row';
import { GlobalContext } from '../../context';

export const JSONViewer = (props) => {
	const { json, indentLevel, propName, isHasComma, startLineNumber, parent } = props;

	const [jsonLength, setJsonLength] = useState(json ? (Array.isArray(json) ? json.length : Object.keys(json).length) : 0);
	const [ isExpand, setIsExpand ] = useState(true);
	const { isShowFooter, height, isEmptyObjectOneLine, isShowLineNumber, canCollapse } = useContext(GlobalContext);

	useEffect(() => {
		setJsonLength(json ? (Array.isArray(json) ? json.length : Object.keys(json).length) : 0)
	}, [json]);

	const BasicType = (value) => {
		if (value === null) {
			return <TypeNull />;
		}
		switch (typeof value) {
			case 'string': return <TypeString string={value} />;
			case 'number': return <TypeNumber number={value} />;
			case 'boolean': return <TypeBoolean boolean={value} />;
		}
	};

	const getJsonAllExpendLength = (currentJson = json) => {
		let length = 0;
		// console.log(json)

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

		return length + ((isEmptyObjectOneLine && Object.keys(currentJson).length === 0) ? 1 : 2)
	};

	const getKeyIndexInJSON = (key, targetObject = json) => {
		let length = 1;

		for (let i in targetObject) {
			if (i === String(key)) {
				break;
			}

			const item = targetObject[i];
			if (item === null) {
				length += 1;
			} else {
				switch (typeof item) {
					case 'string':
					case 'number':
					case 'boolean': length += 1; break;
					case 'object': {
						if (!item) {
							length += 1;
							break;
						} else {
							for (let j in item) {
								if (typeof item[j] === 'object') {
									if (!item[j]) {
										length += 1;
									} else {
										length += getKeyIndexInJSON(j, item[j]) + ((isEmptyObjectOneLine && Object.keys(item[j]).length === 0) ? 0 : 1);
									}

								} else {
									length += 1;
								}
							}
							length += (isEmptyObjectOneLine && Object.keys(item).length === 0) ? 1 : 2;
						}
					}
				}
			}
		}

		return length;
	};

	const toggleExpand = () => setIsExpand(!isExpand);

	const getJsonViewerStyle = () => {
		if (indentLevel === 0) {
			let style = { maxHeight: height };

			if (!canCollapse && !isShowLineNumber) {
				style.paddingLeft = '20px';
			} else {
				if (!canCollapse) {
					style.paddingLeft = '40px';
				}

				if (!isShowLineNumber) {
					style.paddingLeft = '30px';
				}
			}
			return style;
		} else {
			return {
				paddingLeft: '20px'
			};
		}
	};

	return (
			<StyledJSONViewer className={indentLevel === 0 ? `level0 ${isShowFooter ? 'withFooter' : ''}` : ''} style={getJsonViewerStyle()}>
				{
					!Array.isArray(json) &&
					(

						<div className="trueContent">
							{
								indentLevel === 0 && (isShowLineNumber || canCollapse) && <div className="leftLine" />
							}
							<Row updateExpand={toggleExpand} lineNumber={startLineNumber} propStructure={parent} {...(isEmptyObjectOneLine && Object.keys(json).length === 0 ? {} : {collapsed: isExpand})} >
								{
									propName &&
									<>
										<span>"{propName}"</span>
										<span className="divider">:</span>
									</>
								}
								<span className="sign">{'{'}
									{
										(Object.keys(json).length === 0 && isEmptyObjectOneLine)
											?
												<>
													<span className="sign">{'}'}</span>
													{isHasComma && <span className="divider comma">,</span>}
												</>
											: ''
									}
								</span>
							</Row>

							{
								!isExpand ? <span className="ellipsis">...</span>:
									(<div>

											{
												Object.entries(json).map(([key, value], index) => {
													if (typeof value === 'undefined') {
														return '';
													} else if (['string', 'number', 'boolean', 'undefined'].includes(typeof value) ||  value == null) {
														return (
															<Row key={index} className="propItem" style={{ paddingLeft: '20px' }} lineNumber={startLineNumber + getKeyIndexInJSON(key)} propStructure={parent.concat(key)}>
																<span>"{key}"</span><span className="divider">:</span>{BasicType(value)}
																{index < jsonLength - 1 && <span className="divider comma">,</span>}
															</Row>
														);
													} else {
														return <JSONViewer propName={key} json={value} indentLevel={indentLevel + 1} isHasComma={index < jsonLength - 1} startLineNumber={startLineNumber + getKeyIndexInJSON(key)} key={index} parent={parent.concat(key)} />
													}

												})
											}
										</div>
									)
							}

							{
								!(isEmptyObjectOneLine && Object.keys(json).length === 0) &&
								<Row lineNumber={startLineNumber + getJsonAllExpendLength() - 1} propStructure={parent}>
									<span className="sign">{'}'}</span>
									{isHasComma && <span className="divider comma">,</span>}
								</Row>
							}
						</div>
					)
				}
				{
					Array.isArray(json) &&
					(
						<div className="trueContent">
							{
								indentLevel === 0 && ((isShowLineNumber || canCollapse)) && <div className="leftLine" />
							}
							<Row updateExpand={toggleExpand} lineNumber={startLineNumber} propStructure={parent} {...(isEmptyObjectOneLine && Object.keys(json).length === 0 ? {} : {collapsed: isExpand})}>
								{
									propName &&
									<>
										<span>"{propName}"</span>
										<span className="divider">: </span>
									</>
								}
								<span className="sign">
									{'['}
									{
										(json.length === 0 && isEmptyObjectOneLine)
											?
											<>
												<span className="sign">{']'}</span>
												{isHasComma && <span className="divider comma">,</span>}
											</>
											: ''
									}
								</span>
							</Row>
							{
								!isExpand ? <span className="ellipsis">...</span>:
									(<div>
										{
											json.map((value, index) => {
												if (typeof value === 'undefined') {
													return '';
												} else if (['string', 'number', 'boolean', 'undefined'].includes(typeof value) ||  value == null) {
													return (
														<Row key={index} className="propItem" style={{ paddingLeft: '20px' }} lineNumber={startLineNumber +getKeyIndexInJSON(index) } propStructure={parent.concat(index.toString())}>
															{BasicType(value)}
															{index < jsonLength - 1 && <span className="divider comma">,</span>}
														</Row>
													);
												} else {
													return <JSONViewer
														json={value}
														indentLevel={indentLevel + 1}
														isHasComma={index < jsonLength - 1}
														startLineNumber={startLineNumber + getKeyIndexInJSON(index) }
														key={index}
														parent={parent.concat(index.toString())}
													/>;
												}
											})
										}
									</div>)
							}

							{
								!(isEmptyObjectOneLine && json.length === 0) &&
								<Row lineNumber={startLineNumber + getJsonAllExpendLength() - 1} propStructure={parent}>
									<span className="sign">{']'}</span>
									{isHasComma && <span className="divider comma">,</span>}
								</Row>
							}
						</div>
					)
				}
			</StyledJSONViewer>
	);
};

JSONViewer.propTypes = {
	json: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]), // 数据源
	propName: PropTypes.string,
	indentLevel: PropTypes.number, // 缩进等级，对应于【对象的嵌套的等级】，默认无缩进
	isHasComma: PropTypes.bool,
	startLineNumber: PropTypes.number,
	parent: PropTypes.array
	// indentSize: PropTypes.number, // 每级缩进的大小，默认 4
};

JSONViewer.defaultProps = {
	indentLevel: 0,
	startLineNumber: 1,
	propName: '',
	isHasComma: false,
	parent: []
	// indentSize: 4
};

