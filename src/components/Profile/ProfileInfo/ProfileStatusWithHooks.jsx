import React, {useState, useEffect} from "react";
import s from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {
	
	let [editMode, setEditMode] = useState(false);		// Возвращает массив, 0-й элемент - текущее значение (переданное), 1-й - callback для изменения данного параметра
	let [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);				// Зависит от props.status. Если изменился - вызывается переданный callback

	const activateEditMode = () => {
		setEditMode(true);
	};

	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateStatus(status);
	}

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value);
	}

	return (
		<div>
			{ !editMode &&
				<div>
					<b>Status: </b> <span onDoubleClick = {activateEditMode} >{props.status || "------------"}</span>
				</div>
			}

			{editMode &&
				<div>
					<input 	onChange = {onStatusChange} autoFocus = {true}
							onBlur = {deactivateEditMode}
							value = {status} />
				</div>
			}
		</div>
	);
};
export default ProfileStatusWithHooks;