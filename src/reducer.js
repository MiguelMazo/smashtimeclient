export const initialState = {
	characterName: "",
}

const reducer = (state, action) => {
	switch(action.type){
		case 'ADD_CHARACTER':
			return {
				characterName: action.item,
			};
		default:
			return state;
	}
}

export default reducer;