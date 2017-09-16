/**
 * Created by fengs on 2017/9/16.
 */
require('./index.scss');
import classNames from 'classnames';

var MaskLayer = React.createClass({
	componentDidMount: function () {
		this.props.maskLayerInitSlide(this.props.imgId);

		if (this.props.isSelectPerformeInfoNavId == 4) {

			$(".article-content .video-slide-content").each(function () {
				var id = $(this).find(".article-scroll-content").attr("id");
				var scrollbar = $(this).find(".mask-layer-scrollbar"),
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
				var frame1 = new Sly('#' + id, options).init();
			});
		}

	},
	events: {
		left: function (type) {
			this.props.maskLayerLeft(type);
		},

		right: function (type) {
			this.props.maskLayerRight(type);
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

		var maskLayerSuspendCls = classNames({
			'mask-layer-suspend': true,
			'mask-layer-suspend-none': this.props.isMaskLayerPlay
		});

		var maskLayerTopLogoCls = classNames({
			'mask-layer-top-logo': true,
			'mask-layer-top-logo-top': this.props.isSelectPerformeInfoNavId == 4
		});
		var length = Math.ceil(dataList.length / 3);
		var arrTest = [];
		for (let i = 0; i < length; i++) {
			arrTest.push(i);
		}

		return (
			<div className="mask-layer-content">
				{this.props.isSelectPerformeInfoNavId == 4 ?
					<div className="video-content article-content">
						<div className="title-work-name">{title}</div>
						<div className="top-slide-contnet">
							<div className="left-arrow"
								 onClick={_this.events.left.bind(_this,"article-top")}></div>
							<div className="right-arrow"
								 onClick={_this.events.right.bind(_this,"article-top")}></div>
							<div className="slide-container">
								<div id="slide" className="index-slide slide" alt="star"
									 onTouchStart={_this.props.touchStart.bind(_this)}
									 onTouchMove={_this.props.touchMove.bind(_this)}
									 onTouchEnd={_this.props.touchEnd.bind(_this,"article-top")}
								>
									{
										dataList.map(function (modern, i) {
											return (
												<div key={i} className="img video-slide-content" data-id={modern.id}>
													<div className="mask-layer-scrollbar bottom-info-scrollbar">
														<div className="handle"></div>
													</div>
													<div className="article-scroll-content"
														 id={"maskLayer" + modern.id}>
														<div
															dangerouslySetInnerHTML={{__html : modern.articleContent }}>

														</div>
													</div>
												</div>
											)
										})
									}
								</div>
							</div>
						</div>
						<div className="bottom-slide-contnet">
							<div className="left-arrow"
								 onClick={_this.events.left.bind(_this,"article-bottom")}></div>
							<div className="right-arrow"
								 onClick={_this.events.right.bind(_this,"article-bottom")}></div>
							<div className="slide-container">
								<div id="slide" className="index-slide slide" alt="star"
									 onTouchStart={_this.props.touchStart.bind(_this)}
									 onTouchMove={_this.props.touchMove.bind(_this)}
									 onTouchEnd={_this.props.touchEnd.bind(_this,"article-bottom")}
								>
									{
										arrTest.map(function (index, key) {
											return (
												<div className="img article-slide-content" key={key}>
													{
														dataList.map(function (article, i) {
															var cls = classNames({
																'article-li': true,
																'article-li-isSelect': article.isSelect
															});
															return (
																i < 3 * (key + 1) && i >= 3 * key ?
																	<div key={i} className={cls} data-id={i}
																		 onClick={_this.props.selectArticle.bind(_this,i,article.id)}
																	>
																		<div className="article-img">
																			<img src={article.preview}/>
																		</div>
																		<div className="article-name">
																			{article.name}
																		</div>
																	</div> :
																	null

															)
														})
													}
												</div>
											)
										})

									}
								</div>
							</div>
						</div>
					</div>
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

				<div className={maskLayerTopLogoCls}></div>
				<div className="back-off" onClick={this.props.hideMaskLayer.bind(this)}></div>
			</div>
		);
	}
});
module.exports = MaskLayer;