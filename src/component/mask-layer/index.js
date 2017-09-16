/**
 * Created by fengs on 2017/9/16.
 */
require('./index.scss');
import classNames from 'classnames';

var MaskLayer = React.createClass({
	componentDidMount: function () {

		this.props.maskLayerInitSlide();
	},
	events: {
		left: function () {
			this.props.maskLayerLeft();
		},

		right: function () {
			this.props.maskLayerRight();
		}

	},

	render(){
		var title = "";
		var dataList = [];
		var _this = this;

		switch (this.props.isSelectPerformeInfoNavId) {
			case "1":
				title = "话剧作品";
				dataList = _this.props.performer.modernList;
				break;
			case "2":
				title = "他院作品";
				dataList = _this.props.performer.heInstituteList;
				break;
			case "3":
				title = "影视作品";
				dataList = _this.props.performer.moviesList;
				break;
			case "4":
				title = "发表文章";
				dataList = _this.props.performer.articleList;
				break;
		}
		var videoRegular = /\.(mp4|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb)$/i;
		console.log("render:" + this.props.isMaskLayerPlay);
		var maskLayerSuspendCls = classNames({
			'mask-layer-suspend': true,
			'mask-layer-suspend-none': this.props.isMaskLayerPlay
		});
		return (
			<div className="mask-layer-content">
				{this.props.isSelectPerformeInfoNavId == 4 ?
					null
					:
					<div className="video-content">
						<div className="title-work-name">{title}</div>
						<div className="top-slide-contnet">
							<div className="left-arrow"
								 onClick={_this.events.left.bind(_this,"top-slide-contnet")}></div>
							<div className="right-arrow"
								 onClick={_this.events.right.bind(_this,"top-slide-contnet")}></div>
							<div className="slide-container">
								<div id="slide" className="index-slide slide" alt="star"
									 onTouchStart={_this.props.touchStart}
									 onTouchMove={_this.props.touchMove}
									 onTouchEnd={_this.props.touchEnd}
								>
									{
										dataList.map(function (modern, i) {
											return (
												<div key={i} className="img video-slide-content">
													{

														videoRegular.test(modern.video) ?
															<div className="video-img" id={"maskLayer" + modern.id}>
																<div className={maskLayerSuspendCls}
																	 onClick={_this.props.maskLayerControl.bind(this,"maskLayer" + modern.id)}></div>
																<video ref='media' className="media-video"
																	   type='video/mp4'
																	   loop="loop"
																	   preload="preload"
																	   src={modern.video ? modern.video : ""}
																	   poster={modern.preview ? modern.preview : ""}
																>
																</video>
															</div> :
															<div className="video-img">
																<img src={modern.video}/>
															</div>
													}

												</div>
											)
										})
									}
								</div>
							</div>
						</div>
						<div className="bottom-slide-contnet">
							<div className="left-arrow"
								 onClick={_this.events.left.bind(_this,"bottom-slide-contnet")}></div>
							<div className="right-arrow"
								 onClick={_this.events.right.bind(_this,"bottom-slide-contnet")}></div>
							<div className="slide-container">
								<div id="slide" className="index-slide slide" alt="star"
									 onTouchStart={_this.props.touchStart}
									 onTouchMove={_this.props.touchMove}
									 onTouchEnd={_this.props.touchEnd}
								>
									{
										dataList.map(function (modern, i) {
											return (
												<div key={i} className="img preview-slide-content">
													<div className="modern-img">
														<img src={modern.preview}/>
													</div>
													<div className="modern-name">{modern.name}</div>
												</div>
											)
										})
									}
								</div>
							</div>
						</div>
					</div>
				}

				<div className="mask-layer-top-logo"></div>
				<div className="back-off" onClick={this.props.hideMaskLayer.bind(this)}></div>
			</div>
		);
	}
});
module.exports = MaskLayer;