/**
 * Created by fengs on 2017/9/11.
 */
require('../style/performer-list.scss');
var videoImg = require("../../../images/performer-list/video.png");
import classNames from 'classnames';

var HomePage = React.createClass({
	componentDidMount: function () {
		require("../../../component/arctext/jquery.arctext.js");
		// $(".letter-list").arctext({radius: 1100});

		var cont = $(".performer-list-content"),
			scrollbar = cont.find(".performer-list-scrollbar"),
			options = {
				"horizontal": 0,
				"itemNav": "basic",
				"dragContent": 1,
				scrollBar: scrollbar,
				mouseDragging: 1,
				touchDragging: 1,
				scrollBy: 1,
				dynamicHandle: true
			};
		var frame = new Sly('#performer-sly', options).init();

	},

	render(){

		var performerArr = this.props.performerArr;
		var length = Math.ceil(performerArr.length / 3);
		var arrTest = [];
		for (let i = 0; i < length; i++) {
			arrTest.push(i);
		}

		var performerSlyCls = classNames({
			'performer-sly': true,
			'performer-sly-vertical': length <= 4
		});

		return (
			<div className="performer-list-content">
				<div className="performer-list-div">
					<div className="performer-list-scrollbar">
						<div className="handle"></div>
					</div>
					<div className="performer-list-scrollbar-content">
						<div className={performerSlyCls} id="performer-sly">
							<ul className="performer-big">
								{
									arrTest.map(function (index, key) {
										return (
											<div className="repertoire-list-div" key={key}>
												{
													performerArr.map(function (performer, i) {

														return (
															i < 3 * (key + 1) && i >= 3 * key ?
																<div className="performer-li" key={i}>
																	<img src={performer.img} alt="暂无图片"/>
																</div> :
																null
														)
													})
												}
											</div>
										)
									})
								}
							</ul>
						</div>
					</div>
				</div>
				<div className="letter-content">
					<div className="letter-list">
						{
							this.props.letterArr.map(function (lerrer, i) {
								var cls = "char" + i;
								const liCls = classNames({
									'letter-li': true,
									cls: true
								});

								return (
									<div className={liCls} key={i}>
										<span className="letter-name">{lerrer}</span>
										<span className="select-img"></span>
									</div>
								);
							})
						}

					</div>
					<div className="letter-title"></div>
				</div>
				<div className="video-content">
					<div className="video-content-div">
						<img src={videoImg} alt="暂无图片"/>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = HomePage;