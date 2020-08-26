import React from "react";
import Profile from "./Profile";
import {setUserProfile, getProfile, getStatus, updateStatus, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {profileAPI} from "../../api/profile-api";

class ProfileContainer extends React.Component {

	refreshProfile() {
		// debugger;
		let userId = this.props.match.params.userId;
		if (!userId) {
			userId = this.props.authorizedUserId;
			if (!userId) {
				this.props.history.push("/login");
				return;
			};
		};
			// userId = 5126;
		this.props.getProfile(userId); // Получить профиль конкретного юзера (запрос в BLL)
		this.props.getStatus(userId);
	}
	
	componentDidMount() {
		// debugger;
		console.log('componentDidMount');
		this.refreshProfile();
	}

	componentDidUpdate(prevProps, prevState) {
		// debugger;
		if (this.props.match.params.userId != prevProps.match.params.userId)
			this.refreshProfile();
		console.log("componentDidUpdate");
	}

	render() {
		

		return (
			<Profile 	{...this.props}
						isOwner = {!this.props.match.params.userId}
						profile = {this.props.profile}
						status = {this.props.status}
						updateStatus = {this.props.updateStatus}
						savePhoto = {this.props.savePhoto} />
		);
	}
};

let mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.userId,
	isAuth: state.auth.isAuth
});

export default compose(
	connect(mapStateToProps, {setUserProfile, getProfile, getStatus, updateStatus, savePhoto, saveProfile}),
	withRouter
	// withAuthRedirect
)(ProfileContainer);

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// let mapStateToProps = (state) => ({
// 	profile: state.profilePage.profile
// });

// let withRouterContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, {setUserProfile, getProfile})(withRouterContainerComponent);