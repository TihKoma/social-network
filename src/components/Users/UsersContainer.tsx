import React from "react";
// import UsersAPIComponent from "./UsersAPIComponent";
import {connect} from "react-redux";
import {follow, unfollow, toggleFollowingProgress, setCurrentPage, requestUsers} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";
import {usersAPI} from "../../api/users-api";

type MapStatePropsType = {
	currentPage: number,
	pageSize: number,
	isFetching: boolean,
	totalUsersCount: number,
	users: Array<UserType>,
	followingInProgress: Array<number>
};

type MapDispatchPropsType = {
	unfollow: (userId: number) => void,
	follow: (userId: number) => void,
	getUsers: (currentPage: number, pageSize: number) => void,
	setCurrentPage: (currentPage: number) => void
};

type OwnPropsType = {
	pageTitle: string
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
	// constructor(props) {
		// super(props);
	// }

	componentDidMount() { // Вызывается, когда jsx этой компоненты отрисован
		let {currentPage, pageSize} = this.props;
		this.props.getUsers(currentPage, pageSize); // вызов getUsers1, диспатчит то, что вернёт thunkCreator
		// this.props.toggleIsFetching(true);
		
		// usersAPI.requestUsers(this.props.currentPage, this.props.pageSize).then(data => {
		// 	this.props.toggleIsFetching(false);
		// 	this.props.setUsers(data.items);
		// 	this.props.setTotalUsersCount(data.totalCount);
		// });
	}

	onPageChanged = (pageNumber: number) => {
		const {pageSize} = this.props;
		this.props.getUsers(pageNumber, pageSize); // Получить юзеров (запрос в BLL)
		this.props.setCurrentPage(pageNumber);
		
		// this.props.toggleIsFetching(true);

		// usersAPI.getUsers(pageNumber, this.props.pageSize)
		// 	.then(data => {
		// 		this.props.toggleIsFetching(false);
		// 		this.props.setUsers(data.items);
		// 	});
	}

	render() {
		console.log("Render");
		return <>
			<h2>{this.props.pageTitle}</h2>
			{this.props.isFetching ? <Preloader /> : null}
			<Users 	totalUsersCount = {this.props.totalUsersCount}
					pageSize = {this.props.pageSize}
					currentPage = {this.props.currentPage}
					onPageChanged = {this.onPageChanged}
					users = {this.props.users}
					follow = {this.props.follow}
					unfollow = {this.props.unfollow}
					followingInProgress = {this.props.followingInProgress}
			/>
		</>
	}
};

// let mapStateToProps = (state) => {
// 	return {
// 		users: state.usersPage.users,
// 		pageSize: state.usersPage.pageSize,
// 		totalUsersCount: state.usersPage.totalUsersCount,
// 		currentPage: state.usersPage.currentPage,
// 		isFetching: state.usersPage.isFetching,
// 		followingInProgress: state.usersPage.followingInProgress
// 	};
// };

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	console.log("MapStateToProps");
	return {
		// users: getUsersSuperSelector(state),
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	};
};

//getUsers1: getUsers2
// 							2 - thunkCreator
// getUsers1() {
// 		dispatch(getUsers2())
// }

export default compose(
	// withAuthRedirect,
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
		follow, unfollow, getUsers: requestUsers, setCurrentPage
	})
)(UsersContainer);

// export default connect(mapStateToProps, {
// 	follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers
// })(UsersContainer);

// let mapDispatchToProps = (dispatch) => {
// 	return {
// 		follow: (userId) => {
// 			dispatch(followAC(userId));
// 		},
// 		unfollow: (userId) => {
// 			dispatch(unfollowAC(userId));
// 		},
// 		setUsers: (users) => {
// 			dispatch(setUsersAC(users));
// 		},
// 		setCurrentPage: (pageNumber) => {
// 			dispatch(setCurrentPageAC(pageNumber));
// 		},
// 		setTotalUsersCount: (totalCount) => {
// 			dispatch(setUsersTotalCountAC(totalCount));
// 		},
// 		toggleIsFetching: (isFetching) => {
// 			dispatch(toggleIsFetchingAC(isFetching));
// 		}
// 	};
// };

// export default connect(mapStateToProps, {
// 	follow: followAC,
// 	unfollow: unfollowAC,
// 	setUsers: setUsersAC,
// 	setCurrentPage: setCurrentPageAC,
// 	setTotalUsersCount: setUsersTotalCountAC,
// 	toggleIsFetching: toggleIsFetchingAC
// })(UsersContainer);

