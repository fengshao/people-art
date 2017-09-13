/**
 * Created by fengshao on 2017/9/8.
 */
require("./index.scss");
import React from 'react';
var SlideStore = require("./script/slide-store");
var SlideAction = require("./script/slide-action");
//窗口大小改变时改变轮播图宽高
$(window).resize(function () {
	$(".slide").height($(".slide").width() * 0.56);
});
var Slide = React.createClass({
	getInitialState: function () {
		var data = SlideStore.getState();
		return data;
	},

	onChange: function () {
		var data = SlideStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		SlideStore.listen(this.onChange);
		SlideAction.initSlide();
		SlideAction.k_touch();
	},

	componentWillUnmount: function () {
		SlideStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
	},
	render: function () {
		return (
			<div className="slide-container">
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
