import React from "react";
import s from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts.jsx";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
	// console.log("Profile");
	return (
		<div>
			<ProfileInfo 	savePhoto = {props.savePhoto}
							isOwner = {props.isOwner}
							profile = {props.profile}
							saveProfile={props.saveProfile}
							status = {props.status}
							updateStatus = {props.updateStatus} />

			<MyPostsContainer />

		</div>
	);
};

export default Profile;