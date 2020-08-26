import React from "react";
import {connect} from "react-redux";
import News from "./News";
import compose from "redux";
import {getNews} from "../../redux/news-selectors.js";
import {addNews} from "../../redux/news-reducer";

class NewsContainer extends React.Component {
	render() {
		return <News {...this.props} />;
	}
};

const mapStateToProps = (state) => ({
	news: getNews(state)
});

export default connect(mapStateToProps, {addNews})(NewsContainer);