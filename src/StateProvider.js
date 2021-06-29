import React, { createContext, useContext, useReducer} from "react";

//Prepares the datalayer
export const StateContext = createContext();

//Wrap our app and provide data layer
export const StateProvider = ({ reducer, initialState, children}) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>

	{children}
	
	</StateContext.Provider>
);

//Pool Information from data layer
export const useStateValue = () => useContext (StateContext);