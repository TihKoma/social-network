import React from "react";
import s from "./News.module.css";
// import AddNewsForm from "./AddNewsForm";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {reduxForm} from "redux-form";

const AddNewsForm = ({handleSubmit}) => {
	return <form onSubmit={handleSubmit}>
		{createField("Title", "title", [required], Input)}
		{createField("Content", "content", [required], Textarea)}
		<button>Save news</button>
	</form>;
};

const AddNewsReduxForm = reduxForm({form: "news"})(AddNewsForm);

const News = (props) => {
	const onSubmitNewsForm = (formData) => {
		// console.log(formData);
		props.addNews(formData);
	};

	return (
		<div>
			<AddNewsReduxForm onSubmit={onSubmitNewsForm} />
		</div>
	);
};


export default News;