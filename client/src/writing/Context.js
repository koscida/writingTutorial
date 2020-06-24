// import React, { createContext } from 'react'

// export const { Provider, Consumer } = createContext()

// export const withContext = Component => 
// 	props => <Consumer>
// 		{ value => <Component {...value} {...props} /> }
// 	</Consumer>

import React from 'react';

const Context = React.createContext();

export default Context;