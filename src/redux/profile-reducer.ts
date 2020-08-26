import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
	// const ADD_POST = 'ADD-POST';
	// const SET_USER_PROFILE = 'SET_USER_PROFILE';
	// const SET_STATUS = 'SET_STATUS';
	// const DELETE_POST = 'DELETE_POST';
	// const CHANGE_POST = 'CHANGE_POST';
// const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
	posts: [
		{id: 1, message: 'Hi, how are you?', countLikes: 12},
		{id: 2, message: "It's my first post", countLikes: 11},
		{id: 3, message: "blabla", countLikes: 110},
		{id: 4, message: "dada", countLikes: 210}
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: ""
};

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'SN/PROFILE/ADD_POST':
			let newPost = {
				id: 5,
				message: action.postText, //this._state.profilePage.newPostText
				countLikes: 0
			};
			
			return {
				...state,
				posts: [...state.posts, newPost]
			};

		// case UPDATE_NEW_POST_TEXT:
		// 	return {
		// 		...state,
		// 		newPostText: action.newText
		// 	};

		case 'SN/PROFILE/SET_STATUS':
			return {
				...state,
				status: action.status
			};

		case 'SN/PROFILE/SET_USER_PROFILE':
			return {...state, profile: action.profile};

		case 'SN/PROFILE/DELETE_POST':
			return {...state, posts: state.posts.filter(p => p.id != action.postId)};

		case 'SN/PROFILE/CHANGE_POST':
			return {...state, posts: state.posts.map( p => {
				if (p.id === action.postId)
					p.message = action.message;
				return p;
			})};

		case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
			return {...state, profile: {...state.profile, photos: action.photos} as ProfileType};

		default:
			return state;
	};
};


export const actions = {
	addPostActionCreator: (postText: string) => ({ type: 'SN/PROFILE/ADD_POST', postText } as const),
	setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
	setStatus: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
	deletePost: (postId: number) => ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
	savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const),
	changePost: (postId: number, message: string) => ({ type: 'SN/PROFILE/CHANGE_POST', postId, message } as const)
};

// export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });


// Thunk Creator
export const getProfile = (userId: number): ThunkType => async (dispatch) => {
	const data = await profileAPI.getProfile(userId);
	dispatch(actions.setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
	let data = await profileAPI.getStatus(userId);
	dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
	let data = await profileAPI.updateStatus(status);
	if (data.resultCode === 0)
		dispatch(actions.setStatus(status));
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
	let data = await profileAPI.savePhoto(file);
	if (data.resultCode === 0)
		dispatch(actions.savePhotoSuccess(data.data.photos));
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	const data = await profileAPI.saveProfile(profile);
	if (data.resultCode === 0)
		if (userId != null)
			dispatch(getProfile(userId));
		else
			throw new Error("userId can't be null");
	else {
		dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}));
		// dispatch(stopSubmit("edit-profile", {"contacts": {"facebook": response.data.messages[0]}}));
		return Promise.reject(data.messages[0]);
	};
};

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;