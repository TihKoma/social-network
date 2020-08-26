import React from "react";
import styles from "./users.module.css";
import * as axios from "axios";
import userPhoto from "../../assets/img/user.jpg";

let Users = (props) => {

	// debugger;
	let getUsers = () => {
		if (props.users.length === 0)
		axios.get("https:social-network.samuraijs.com/api/1.0/users")
			.then(response => {
				props.setUsers(response.data.items);
			});
	};

		// props.setUsers(
		// 	[
		// 		{id: 1, photoUrl: 'https://im0-tub-ru.yandex.net/i?id=6e1d783c3e9ec88a84cc813a0171b8f0&n=13',
		// 			followed: false, fullName: 'Dmitry', status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'}},
		// 		{id: 2, photoUrl: 'https://im0-tub-ru.yandex.net/i?id=6e1d783c3e9ec88a84cc813a0171b8f0&n=13',
		// 			followed: true, fullName: 'Sasha', status: 'I am a boss too', location: {city: 'Moscow', country: 'Russia'}},
		// 		{id: 3, photoUrl: 'https://im0-tub-ru.yandex.net/i?id=6e1d783c3e9ec88a84cc813a0171b8f0&n=13',
		// 			followed: false, fullName: 'Andrew', status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraine'}},
		// 	]
		// );

	return <div>
		<button onClick = {getUsers}>Get Users</button>
		{
			props.users.map(u => <div key = {u.id}>
				<span>

					<div>
						<img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.userPhoto} />
					</div>
					<div>
						{ u.followed
							? <button onClick = {() => { props.unfollow(u.id) }}>Unfollow</button>
							: <button onClick = {() => { props.follow(u.id) }}>Follow</button> }
					</div>

				</span>

				<span>
					<span>
						<div>{u.name}</div>
						<div>{u.status}</div>
					</span>

					<span>
						<div>{"u.location.country"}</div>
						<div>{"u.location.city"}</div>
					</span>
				</span>
			</div>)
		}
	</div>
};

export default Users;