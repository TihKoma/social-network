import React from 'react';
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";

import NewsContainer from "./components/News/NewsContainer";
import {BrowserRouter, Route, withRouter, Switch, Redirect} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";

// import ProfileContainer from "./components/Profile/ProfileContainer";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components//Profile/ProfileContainer'));
// import store from "./redux/redux-store";
// import {BrowserRouter} from "react-router-dom";
// setInterval(() => {
// 	store.dispatch({type: "FAKE"});
// }, 1000 );
window.store = store;

class App extends React.Component {
	catchAllUnhandledErrors = (promiseRejectionEvent) => {
		alert("Some error occured");
	}

	componentWillUnmount() {
		window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
	}

 	componentDidMount() {
		this.props.initializeApp();
		window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
	}

 	render() {
 		if (!this.props.initialized)
			return <Preloader />;

	    return <div className="app-wrapper">
	    	<HeaderContainer />
	    	<Navbar />
			<div className="app-wrapper-content">
				{/*<Route path="/dialogs" component={Dialogs} /> component - принимает только ссылку на функцию */} 
				{/*<Route path="/profile" component={Profile} />*/}
				{/*<Route path="/news" component={News} />*/}
				{/*<Dialogs />*/}
				{/*<Profile />*/}
				<Switch>
					<Route exact path="/" 
							render={() => <Redirect to={"/profile"} />} />

					<Route path="/dialogs" 
							render={withSuspense(DialogsContainer)} />

					<Route path="/profile/:userId?"
							render={withSuspense(ProfileContainer)} />

					<Route path="/news" render={ () => <NewsContainer />} />

					<Route path="/users"
							render={ () => <UsersContainer pageTitle={"Самураи"} /> } />

					<Route path="/login/facebook"
							render={ () => <div>From facebook</div> } />
					
					<Route path="/login"
							render={ () => <LoginPage /> } />

					<Route path="*"
							render={ () => <div>404 Not found</div> } />
				</Switch>
			</div>

	    </div>;
  }
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
});

let AppContainer = compose(
	withRouter,
	connect(mapStateToProps, {initializeApp}))(App);

const MyApp = (props) => {
	return <BrowserRouter>
		<Provider store = {store}>
			<AppContainer />
		</Provider>
	</BrowserRouter>;
};

export default MyApp;