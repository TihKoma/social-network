import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
	return (
		<div className={s.item}>
			<img src="https://img1.goodfon.ru/original/3543x2669/6/4d/avatar-neytiri-zoe-saldana-7414.jpg" />
			{props.message}
			<div>
				<span>likes: {props.countLikes}</span>
			</div>
		</div>
	);
};

export default Post;