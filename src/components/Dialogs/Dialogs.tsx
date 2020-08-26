import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {required, maxLengthCreator} from "../../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogs-reducer";
import {LoginFormValuesType} from "../Login/Login";

const maxLength50 = maxLengthCreator(50);

// Extract <a | b, a | d> = a, т.е. выбирает только те типы, которые assign'ятся друг к другу
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>; // забрать из объекта только string ключи
type LoginFormOwnProps = {};

const AddMessageForm:React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
	return (
		<form onSubmit = {props.handleSubmit} >
			{createField<NewMessageFormValuesKeysType>("Post Text", "newMessageBody", [required, maxLength50], Textarea)}
			<br />
			<button>Send</button>

			{/*
			<textarea onChange={ updateText } ref={ newMessageElement } value={ state.newMessageText } /> <br />
			<button onClick = {addMessage}>Отправить сообщение</button>*/}
		</form>
	);
};

type PropsType = {
	dialogsPage: InitialStateType,
	addMessage: (messageText: string) => void
};

export type NewMessageFormValuesType = {
	newMessageBody: string
};

const Dialogs: React.FC<PropsType> = (props) => {
	let state = props.dialogsPage;
	let dialogsElements = state.dialogs.map(d => <DialogItem name = {d.name} key = {d.id} id = {d.id} />);
	let messagesElements = state.messages.map(m => <Message message = {m.message} key = {m.id} />);

	// let updateText = () => {
	// 	let text = newMessageElement.current.value;
	// 	props.updateNewMessageText(text);
	// };

	const afterSubmit = (result, dispatch) => {
		dispatch(reset("dialogAddMessageForm"));
	};

	let addNewMessage = (values: {newMessageBody: string}) => {
		props.addMessage(values.newMessageBody); // Запрос в BLL
	};
	
	// if (!props.isAuth) {
	// 	return <Redirect to={"/login"}/>;
	// }

	const AddMessageFormRedux = reduxForm({
		form: "dialogAddMessageForm",
		onSubmitSuccess: afterSubmit
	})(AddMessageForm);

	// const onSubmit = (formData) => {
	// 	debugger;
	// 	console.log(formData);
	// };

	return (
		<div className={s.dialogs}>
			<div className={s.dialogsItems}>
				{dialogsElements}
			</div>

			<div className={s.messages}>
				{messagesElements}
				<AddMessageFormRedux onSubmit = {addNewMessage} />
			</div>
		</div>
	);
};


export default Dialogs;