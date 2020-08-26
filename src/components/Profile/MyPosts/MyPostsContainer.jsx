import React from "react";
import MyPosts from "./MyPosts";
import {actions} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
// const MyPostsContainer = (props) => {
// 	return (
// 		<StoreContext.Consumer>
// 		{
// 			(store) => {
// 				let state = store.getState();

// 				let addPost = () => {
// 					store.dispatch(addPostActionCreator());
// 				};

// 				let onPostChange = (text) => {
// 					let action = updateNewPostTextActionCreator(text);
// 					store.dispatch(action);
// 				};

// 				return <MyPosts updateNewPostText = {onPostChange}
// 								addPost = {addPost}
// 								posts = {store.getState().profilePage.posts}
// 								newPostText = {store.getState().profilePage.newPostText} />
// 			}
// 		}
// 		</StoreContext.Consumer>
// 	);
// };

let mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText
	};
};

let mapDispatchToProps = (dispatch) => {
	return {
		// updateNewPostText: (text) => {
		// 	dispatch(updateNewPostTextActionCreator(text));
		// },
		addPost: (postText) => {
			dispatch(actions.addPostActionCreator(postText));
		}
	};
};

// const addPost = (postText) => {
// 	dispatch(addPostActionCreator(postText));
// };

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
// const MyPostsContainer = (props) => {
// 	console.log("qwetry");
// 	return (
// 		<div>fdsf</div>
// 		// <MyPosts 	posts = {state.profilePage.posts
// 					// newPostText = {state.profilePage.newPostText}
// 					// addPost = {addPost} />
// 	);
// };

export default MyPostsContainer;