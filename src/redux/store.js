import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
	_state: {
		profilePage: {
			posts: [
				{id: 1, message: 'Hi, how are you?', countLikes: 12},
				{id: 2, message: "It's my first post", countLikes: 11},
				{id: 3, message: "blabla", countLikes: 110},
				{id: 4, message: "dada", countLikes: 210}
			],

			newPostText: 'GG WP'
		},

		dialogsPage: {
			messages: [
				{id: 1, message: 'Hi'},
				{id: 2, message: 'How is your it-kamasutra?'},
				{id: 3, message: 'Yo'},
				{id: 4, message: 'Yo'},
				{id: 5, message: 'Yo'}
			],

			dialogs: [
				{id: 1, name: 'Dimych'},
				{id: 2, name: 'Vladimir'},
				{id: 3, name: 'Andrey'},
				{id: 4, name: 'Aleksey'},
				{id: 5, name: 'Viktor'},
				{id: 6, name: 'Valera'}
			],

			newMessageText: 'new msg'
		},

		sidebar: {}
	},

	_callSubscriber() {
		console.log("State changed");
	},

	getState() {
		return this._state;
	},

	// addPost() {
		
	// },

	// updateNewPostText(newText) {
		
	// },

	// updateNewMessageText(newText) {
		
	// },

	// addMessage() {
		
	// },

	subscribe(observer) {
		this._callSubscriber = observer;
	},

	dispatch(action) { // type: 'ADD-POST'
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);

		this._callSubscriber(this._state);

		// if (action.type === ADD_POST) {

		// 	let newPost = {
		// 		id: 5,
		// 		message: this._state.profilePage.newPostText,
		// 		countLikes: 0
		// 	};

		// 	this._state.profilePage.posts.push(newPost);
		// 	this._state.profilePage.newPostText = '';
		// 	this._callSubscriber(this._state);

		// } else if (action.type === UPDATE_NEW_POST_TEXT) {

		// 	this._state.profilePage.newPostText = action.newText;
		// 	this._callSubscriber(this._state);

		// } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {

		// 	this._state.dialogsPage.newMessageText = action.newText;
		// 	this._callSubscriber(this._state);

		// } else if (action.type === 'ADD-MESSAGE') {

		// 	let newMessage = {
		// 		id: 1,
		// 		message: this._state.dialogsPage.newMessageText
		// 	};

		// 	this._state.dialogsPage.messages.push(newMessage);
		// 	this._state.dialogsPage.newMessageText = '';
		// 	this._callSubscriber(this._state);

		// };
	},


};












export default store;

window.store = store;