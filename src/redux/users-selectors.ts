import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

// Примитивный селектор
const getUsersSelector = (state: AppStateType) => {
	return state.usersPage.users;
};
// export const getUsersSelector = (state) => {
// 	return getUsers(state).filter(u => true);;
// };

// createSelector возвращает супер селектор (умный), первыми параметрами принимает другие селекторы (примитивные или сложные)
// от которых зависит текущий селектор. Последним параметром принимает callback, выполняющий сложные вычисления (грузит проц)
// или пересоздает объект (приводит к rerender'у). Хранит в себе результаты вызовов селекторов, от которых он зависит
// и результат callback'а. Если при очередном вызове зависящие селекторы вернули тот же результат, callback не вызывается,
// а return'еться результат прошлого вызова, тем самым уменьшая загрузку проца и не вызывая лишнего rerender'а.

export const getUsers = createSelector(getUsersSelector, (users) => {
	return users.filter(u => true);		// возвращает новый массив, но с теми же элементами
});
// Зависит от двух селекторов getUsers, getIsFetching
// export const getUsersSuperSelector = createSelector(getUsers, getIsFetching,
// 	(users, isFetching) => {
// 		return users.filter(u => true);
// });

export const getPageSize = (state: AppStateType) => {
	return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
	return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress;
};