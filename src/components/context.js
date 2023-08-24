import { createContext } from 'react'

const defaultProps = {
	isShowLineNumber: true,
	canCollapse: true,
	isEmptyObjectOneLine: false
}

export const GlobalContext = createContext(defaultProps)
