import React, {ChangeEvent} from "react";
// import s from "./ProfileInfo.module.css";

type PropsType = {
	status: string,
	updateStatus: (newStatus: string) => void
};

type StateType = {
	editMode: boolean,
	status: string
};

class ProfileStatus extends React.Component<PropsType, StateType> {
	state = {
		editMode: false,
		status: this.props.status
	}

	activateEditMode = () => {
		this.setState({		// асинхронный запрос
			editMode: true
		});
		// this.forceUpdate(); переотрисовка вручную (избегать)
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false
		});

		this.props.updateStatus(this.state.status); // запрос в BLL на update статуса в БД
	}

	onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			status: e.currentTarget.value
		});
	}

	componentDidUpdate(prevProps: PropsType, prevState: StateType) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status
			});
		};
	}

	render() {
		return (
			<div>
				{!this.state.editMode &&
					<div>
						<span onDoubleClick = {this.activateEditMode} >{this.props.status || "------------"}</span>
					</div>
				}

				{this.state.editMode &&
					<div>
						<input onChange = {this.onStatusChange} autoFocus = {true} onBlur = {this.deactivateEditMode} value = {this.state.status} />
					</div>
				}
			</div>
		);
	}
};

export default ProfileStatus;