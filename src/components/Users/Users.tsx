import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
	totalUsersCount: number,
	pageSize: number,
	currentPage: number,
	onPageChanged: (pageNumber: number) => void,
	users: Array<UserType>,
	followingInProgress: Array<number>,
	unfollow: (userId: number) => void,
	follow: (userId: number) => void
};

let Users: FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {
	return (
		<div>
			{/*<div>
				{pages.map(p => {
					return <span className = {props.currentPage === p && styles.selectedPage} onClick={(e) => props.onPageChanged(p)} >{p}</span>
				})}
				<span className={styles.selectedPage}>2</span>
			</div>*/}

			<Paginator 	currentPage = {currentPage}
						onPageChanged = {onPageChanged}
						totalItemsCount = {totalUsersCount}
						pageSize = {pageSize}
			/>
			<div>
				{
					users.map(u => <User 	user = {u} 
											key = {u.id}
											followingInProgress = {props.followingInProgress}
											unfollow = {props.unfollow}
											follow = {props.follow}
									/>)
				}
			</div>
		</div>
	);
};

export default Users;