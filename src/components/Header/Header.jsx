import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
	return (
		<header className={s.header}>
			<img src="https://im0-tub-ru.yandex.net/i?id=d0f03749052f868c0bbdfa061e00c411&n=13" />
		
			<div className = {s.loginBlock}>
				{ props.isAuth
					? <div>{props.login} - <button onClick = {props.logout} >Logout</button></div>
					: <NavLink to = {'/login'}>Login</NavLink> }
			</div>
		</header>
	);
};

export default Header;