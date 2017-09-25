/**
 * Created by fengs on 2017/9/11.
 */
require('../style/performer-list.scss');
import {Spin, Icon} from 'antd';
import classNames from 'classnames';

var PerformerListPage = React.createClass({
	componentDidMount: function () {
		require("../../../component/arctext/jquery.arctext.js");
		$(".letter-list").arctext({radius: 1100});

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
		$("#loop-video-media")[0].play();
		this.props.loopVideo();
	},

	render(){
		var _this = this;
		var performerList = this.props.isShowPerformerList;
		var length = Math.ceil(performerList.length / 3);
		var arrTest = [];
		for (let i = 0; i < length; i++) {
			arrTest.push(i);
		}

		//演员列表无法填充满滚动区域时 既行数小于 4 时 添加特殊class 垂直居中
		var performerSlyCls = classNames({
			'performer-sly': true,
			'performer-sly-vertical': length <= 4
		});
		var buquanArr = [];
		for (let i = 0; i < 26 - this.props.letterArr.length; i++) {
			buquanArr.push(i)
		}
		var videoRegular = /\.(mp4|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb)$/i;
		// {
		// 	this.props.isLoading ? <Spin size="large"/> : null
		//
		// }
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
													performerList.map(function (performer, i) {

														return (
															i < 3 * (key + 1) && i >= 3 * key ?
																<div className="performer-li" key={i}
																	 onClick={_this.props.openPerformerInfo.bind(_this,performer.id)}>
																	<img src={performer.headPortrait} alt="暂无图片"/>
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
							buquanArr.map(function (lerrera, i) {
								return (
									<div className="letter-li buquan-cls" key={i}>
										<span className="letter-name">{i}</span>
										<span className="letter-bg">
											<span className="select-img"></span>
										</span>
									</div>
								);
							})
						}
						{
							this.props.letterArr.map(function (letter, i) {
								const liCls = classNames({
									'letter-li': true,
									"letter-li-select": letter.isSelect
								});

								return (
									<div className={liCls} key={i}
										 onClick={_this.props.selectLetter.bind(_this,letter.id)}>
										<span className="letter-name">{letter.letter}</span>
										<span className="letter-bg">
											<span className="select-img"></span>
										</span>
									</div>
								);
							})
						}


					</div>
					<div className="letter-title">{_this.props.isShowLeterStr.letter}</div>
				</div>
				<div className="video-content">
					<div className="video-content-div">
						<video id='loop-video-media' ref='media' className="video" controls="controls"
							   type='video/mp4'
							   preload="preload"
							   src={this.props.classicRepertoireList[0].video ? this.props.classicRepertoireList[0].video : ""}
							   poster={this.props.classicRepertoireList[0].preview ? this.props.classicRepertoireList[0].preview : ""}
						>
						</video>
					</div>
				</div>
				<div className="back-off" onClick={this.props.backOff.bind(this,"homePage")}></div>
			</div>
		);
	}
});
module.exports = PerformerListPage;