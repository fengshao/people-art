/**
 * Created by fengshao on 2017/9/8.
 */
require("./index.css");
//require("./script");
//import image1 from './image/1.png';
//import image2 from './image/2.png';
//import image3 from './image/3.png';
//import image4 from './image/4.png';
//import image5 from './image/5.png';
import React from 'react';
//<button onclick="left()">上一页</button>
//<button onclick="right()">下一页</button>
//<div className="img"><img src={image1}/></div>
//<div className="img"><img src={image2}/></div>
//	<div className="img"><img src={image3}/></div>
//	<div className="img"><img src={image4}/></div>
//	<div className="img"><img src={image5}/></div>
var HomeStore = require("./script/home-store");
var HomeAction = require("./script/home-action");
//窗口大小改变时改变轮播图宽高
$(window).resize(function () {
	$(".slide").height($(".slide").width() * 0.56);
});
var Slide = React.createClass({
	getInitialState: function () {
		var data = HomeStore.getState();
		return data;
	},

	onChange: function () {
		var data = HomeStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		HomeStore.listen(this.onChange);
		HomeAction.initSlide();
		HomeAction.k_touch();
	},

	componentWillUnmount: function () {
		HomeStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			HomeAction.deleteSpecial(data);
		},
		showEditFrom: function (rowData) {
			HomeAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			HomeAction.showAddFrom();
		},
		addSpecial: function (newData) {
			HomeAction.addSpecial(newData);
		},
		editSpecial: function (newData) {
			HomeAction.editSpecial(newData);
		},
		hideEditFrom: function () {
			HomeAction.hideEditFrom();
		}
	},
	render: function () {
		return (
			<div className="container">
				<div id="slide" className="index-slide slide" alt="star">
					{
						this.props.imgDatas.map(function (goodsTypeID, i) {
							return (
								<div key={i} className="img"><img src={goodsTypeID}/></div>
							)
						})
					}
					<div className="slide-bt"></div>
				</div>

			</div>
		);
	}
});
export default Slide;
