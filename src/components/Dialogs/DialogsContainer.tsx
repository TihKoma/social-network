import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import {actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

// const DialogsContainer = (props) => {
// 	return (
// 		<StoreContext.Consumer>
// 		{ 
// 			store => {
// 				let state = store.getState().dialogsPage;

// 				let updateText = (text) => {
// 					let action = updateNewMessageTextActionCreator(text);
// 					store.dispatch(action);
// 				};

// 				let addMessage = () => {
// 					let action = addMessageActionCreator();
// 					store.dispatch(action);
// 				};

// 				return <Dialogs updateNewMessageText = {updateText}
// 								addMessage = {addMessage}
// 								dialogsPage = {state} />
// 			}
// 		}
// 		</StoreContext.Consumer>
// 	);
// };

// state передаваемый через пропсы в dialogs
let mapStateToProps = (state: AppStateType) => {
	return {
		dialogsPage: state.dialogsPage
	};
};

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

// export default DialogsContainer;
export default compose(
	connect(mapStateToProps, {...actions}),
	withAuthRedirect
)(Dialogs);