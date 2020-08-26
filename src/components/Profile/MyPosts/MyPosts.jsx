import React, {PureComponent} from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
// import {updateNewPostTextActionCreator, addPostActionCreator} from "./../../../redux/profile-reducer";
import {Field, reduxForm} from "redux-form";
import {required, maxLengthCreator} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

class MyPosts extends PureComponent {
	// обновляем state и через 2с срабатывает shouldComponentUpdate - true
	componentDidMount() {
		setTimeout(() => {
			this.setState({a: 12});
		}, 2000);
	}
	
	// Тот же функционал написан в PureComponent
	// shouldComponentUpdate(nextProps, nextState) {
	// 	// return false; запрет на render
	// 	return nextProps != this.props || nextState != this.state;
	// }

	render() {
		console.log("RENDER");
		// Работа с копией (не менять глобальный state)
		let postsElements = [...this.props.posts].reverse().map(p => <Post key={p.id} message={p.message} countLikes={p.countLikes} />);
		let newPostElement = React.createRef();

		let addPost = (formData) => {
			this.props.addPost(formData.newPostText);
			// props.dispatch(addPostActionCreator());
		};

		// let onPostChange = () => {
		// 	let text = newPostElement.current.value;
		// 	props.updateNewPostText(text);
		// 	// let action = updateNewPostTextActionCreator(text);
		// 	// props.dispatch(action);
		// };

		const AddNewPostReduxForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

		return (
			<div className={s.postsBlock}>
				<h3>My posts</h3>
		
				<AddNewPostReduxForm onSubmit = {addPost} />

				<div className = {s.posts}>
					{postsElements}
				</div>
			</div>
		);
	}
};

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
	return (
		<form onSubmit = {props.handleSubmit} >
			<div>
				<Field 	component = {Textarea} name = "newPostText" placeholder = "Post Message"
						validate = {[required, maxLength10]} />
			</div>
			
			<div>
				<button>Add post</button>
			</div>				
		</form>
	);
};

export default MyPosts;