import profileReducer, {actions} from "./profile-reducer";
import React from "react";
import {ProfileType} from "../types/types";

let state = {
	posts: [
		{id: 1, message: 'Hi, how are you?', countLikes: 12},
		{id: 2, message: "It's my first post", countLikes: 11},
		{id: 3, message: "blabla", countLikes: 110},
		{id: 4, message: "dada", countLikes: 210}
	],
	profile: null,
	status: ""
};

it('length of posts should be incremented', () => {
	// 1. test data
	let action = actions.addPostActionCreator("it-kamasutra");
	// 2. action
	let newState = profileReducer(state, action);
	// 3. expectation (ожидаемое значение)
	expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
	// 1. test data
	let action = actions.addPostActionCreator("it-kamasutra");
	// 2. action
	let newState = profileReducer(state, action);
	// 3. expectation (ожидаемое значение)
	expect(newState.posts[4].message).toBe("it-kamasutra");
});

it('after deleting length of messages should be decrement', () => {
	// 1. test data
	let action = actions.deletePost(1);
	// 2. action
	let newState = profileReducer(state, action);
	// 3. expectation (ожидаемое значение)
	expect(newState.posts.length).toBe(3);
});

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
	// 1. test data
	let action = actions.deletePost(1000);
	// 2. action
	let newState = profileReducer(state, action);
	// 3. expectation (ожидаемое значение)
	expect(newState.posts.length).toBe(4);
});

it('change message is correct', () => {
	let action = actions.changePost(3, "new value");			// action creator
	let newState = profileReducer(state, action);
	
	expect(newState.posts[2].message).toBe("new value");
});