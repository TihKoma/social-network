// const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
import {InferActionsTypes} from "./redux-store";

// const ADD_MESSAGE = 'SN/DIALOGS/ADD-MESSAGE';

type DialogType = {
	id: number,
	name: string
};

type MessageType = {
	id: number,
	message: string
};

let initialState = {
	messages: [
		{id: 1, message: 'Hi'},
		{id: 2, message: 'How is your it-kamasutra?'},
		{id: 3, message: 'Yo'},
		{id: 4, message: 'Yo'},
		{id: 5, message: 'Yo'}
	] as Array<MessageType>,

	dialogs: [
		{id: 1, name: 'Dimych'},
		{id: 2, name: 'Vladimir'},
		{id: 3, name: 'Andrey'},
		{id: 4, name: 'Aleksey'},
		{id: 5, name: 'Viktor'},
		{id: 6, name: 'Valera'}
	] as Array<DialogType>
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
		// case UPDATE_NEW_MESSAGE_TEXT: // action = {type, newtext}
		// 	return {	// stateCopy {}
		// 		...state,
		// 		newMessageText: action.newText
		// 	};

		case "SN/DIALOGS/ADD-MESSAGE":
			let newMessage = {
				id: 6,
				message: action.newMessageBody
			};
			
			return {	// stateCopy {}
				...state,
				messages: [...state.messages, newMessage]
			};

		default:
			return state;

	};
};

// export const updateNewMessageTextActionCreator = (text) => ({
// 	type: UPDATE_NEW_MESSAGE_TEXT,
// 	newText: text
// });

export const actions = {
	addMessage: (newMessageBody: string) => ({
		type: 'SN/DIALOGS/ADD-MESSAGE',
		newMessageBody
	} as const)
};

export default dialogsReducer;