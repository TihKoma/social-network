import {reset} from "redux-form";

const ADD_NEWS = 'ADD_NEWS';

let initialState = {
	newsList: [
		{id: 1, title: "News1", content: "Some content"},
		{id: 2, title: "News1", content: "Content news 2"},
		{id: 3, title: "News1", content: "Text some news"}
	]
};

const newsReducer = (state = initialState, action) => {

	switch (action.type) {

		case ADD_NEWS:
			const newNews = { id: 4, ...action.newNews};
			return {
				...state,
				newsList: [...state.newsList, newNews]
			};

		default:
			return state;

	};
};

// export const addMessageActionCreator = (newMessageBody) => ({
	// type: ADD_MESSAGE,
	// newMessageBody
// });

export const addNewsAC = (newNews) => ({type: ADD_NEWS, newNews});

export const addNews = (newNews) => (dispatch) => {
	dispatch(addNewsAC(newNews));
	dispatch(reset("news"));
};

export default newsReducer;