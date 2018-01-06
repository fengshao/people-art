/**
 * Created by fengs on 2017/9/10.
 */
require('../style/classicRepertoire.scss');
import classNames from 'classnames';
var frame = "";
var ClassicRepertoire = React.createClass({

	initSly: function () {
		frame ? frame.destroy(true) : frame = ""
		var cont = $(".classic-repertoire-content"),
		// frame = cont.find(".repertoire-sly"),
			scrollbar = cont.find(".repertoire-scrollbar"),
			options = {
				"horizontal": 1,
				"itemNav": "basic",
				"dragContent": 1,
				scrollBar: scrollbar,
				"scrollBy": 1,
				dynamicHandle: true,
				mouseDragging: 1,
				touchDragging: 1
			};
		frame = new Sly('#repertoire-sly', options).init();
	},

	componentDidMount: function () {
		this.initSly();
		if(this.props.isClassicRepertoireLoadingImg){
			this.props.preLoadImg("classicRepertoire");
		}
	},

	componentDidUpdate: function () {
		this.initSly();
	},

	// componentWillMount: function () {
		//this.props.getClassicRepertoireList();
	// },

	render(){
		var _this = this;
		var classicRepertoireList = this.props.classicRepertoireList;
		var classicRepertoire = this.props.classicRepertoire;
		var length = Math.ceil(classicRepertoireList.length / 3);
		var arrTest = [];
		for (let i = 0; i < length; i++) {
			arrTest.push(i);
		}
		var suspendContentCls = classNames({
			'suspend-content': true,
			'suspend-content-block': this.props.isShowSuspend
		});
		return (
			<div className="classic-repertoire-content">
				<div className="repertoire-title">{classicRepertoire.Name ? classicRepertoire.Name : ""}</div>
				<div className="repertoire-video-play-content">
					<div className={suspendContentCls} onClick={_this.props.playVideo.bind(this)}>

					</div>

					<video id='media' ref='media' className="video" controls="controls"
						   type='video/mp4'
						   loop="loop"
						   preload="preload"
						   webkit-playsinline="true"
						   src={classicRepertoire.Video ? classicRepertoire.Video : ""}
						   onPlay={this.props.onPlay.bind(this)}
						   onPause={this.props.onPause.bind(this)}
						   poster={classicRepertoire.Preview ? classicRepertoire.Preview : ""}
					>
					</video>

				</div>
				<div className="repertoire-list-content" id="repertoire-list-content">
					<div className="repertoire-scrollbar">
						<div className="handle"></div>
					</div>
					<div className="test-cls">
						<div className="repertoire-sly" id="repertoire-sly">
							<ul className="big cfix">
								{
									arrTest.map(function (index, key) {
										return (
											<div className="repertoire-list-div" key={key}>
												{
													classicRepertoireList.map(function (performer, i) {
														return (
															i < 3 * (key + 1) && i >= 3 * key ?
																<li className="repertoire-list-li" key={i}
																	onClick={_this.props.playVideoPerformer.bind(_this,performer)}>
																	<div className="repertoire-video-img">
																		<img src={performer.Preview} alt="暂无图片"/>
																	</div>
																	<div
																		className="repertoire-video-title">{performer.Name}</div>
																</li> :
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
					<div className="repertoire-scrollbar">
						<div className="handle"></div>
					</div>
				</div>
				<div className="back-off trans" onClick={this.props.backOff.bind(this,"homePage")}></div>
				<div className="back-off trans arrow-1" onClick={this.props.backOff.bind(this,"homePage")}></div>
			</div>
		);
	}
});
module.exports = ClassicRepertoire;