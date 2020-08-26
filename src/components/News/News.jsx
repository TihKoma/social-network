import React from "react";
import s from "./News.module.css";
import AddNewsForm from "./AddNewsForm";

const News = (props) => {
	return (
		<div>
			<AddNewsForm addNews={props.addNews}/>

			{props.news.map(obj => {
				return <React.Fragment key={`news-${obj.id}`}>
					<div>
						<span>Title: {obj.title} </span> <br />
						<span>Content: {obj.content} </span>
					</div> <br />
				</React.Fragment>;
			})}
		</div>
	);
};

export default News;