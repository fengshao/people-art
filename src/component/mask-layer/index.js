/**
 * Created by fengs on 2017/9/16.
 */
require('./index.scss');
import classNames from 'classnames';
var frame1 = "";
var topSwiper = "";
var bottomSwiper = "";
var controlSwiper3 = "";
var MaskLayer = React.createClass({
	componentDidMount: function () {
		var _this = this;
		bottomSwiper ? bottomSwiper.destroy(true, true) : bottomSwiper = "";
		topSwiper ? topSwiper.destroy(true, true) : topSwiper = "";
		controlSwiper3 = "";
		topSwiper = "";
		bottomSwiper = "";
		topSwiper = new Swiper('.top-slide-contnet .swiper-container', {
			// 如果需要前进后退按钮
			nextButton: '.top-slide-contnet .swiper-button-next',
			prevButton: '.top-slide-contnet .swiper-button-prev',
			controlBy: 'container',
			initialSlide: this.props.imgId,
			onSlideChangeEnd: function (swiper) {
				if (_this.props.isSelectPerformeInfoNavId == 4) {
					_this.slideArticle();
					var $element = $(".article-content .top-slide-contnet .video-slide-content.swiper-slide-active");
					_this.props.selectArticle($element.attr("data-id"));
				}
			},
			onSlideChangeStart: function (swiper) {
				for (let i = 0; i < $(".media-video").length; i++) {
					$(".media-video")[i].pause();
				}
			}
		});


		if (this.props.isSelectPerformeInfoNavId == 4) {
			bottomSwiper = new Swiper('.bottom-slide-contnet .swiper-container', {
				// slidesPerView: 3,
				// centeredSlides: true,
				spaceBetween: 140,
				// freeMode: true,

				grabCursor: true,
				// centeredSlides: true,
				slidesPerView: 'auto',

				// 如果需要前进后退按钮
				initialSlide: this.props.imgId,
				nextButton: '.bottom-slide-contnet .swiper-button-next',
				prevButton: '.bottom-slide-contnet .swiper-button-prev',
				onInit: function (swiper) {
					var $element = $(".article-content .bottom-slide-contnet .article-li.swiper-slide-active");
					_this.props.selectArticle($element.attr("data-id"));
				}

			});

		} else {

			bottomSwiper = new Swiper('.bottom-slide-contnet .swiper-container', {
				effect: 'coverflow',
				grabCursor: true,
				centeredSlides: true,
				slidesPerView: 'auto',
				initialSlide: this.props.imgId,
				coverflow: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true
				},
				nextButton: '.bottom-slide-contnet .swiper-button-next',
				prevButton: '.bottom-slide-contnet .swiper-button-prev',
				onSlideChangeStart: function (swiper) {
					for (let i = 0; i < $(".media-video").length; i++) {
						$(".media-video")[i].pause();
					}
				}
			});
		}

		topSwiper.params.control = bottomSwiper;//需要在bottomSwiper初始化后，topSwiper控制bottomSwiper
		bottomSwiper.params.control = topSwiper;//需要在topSwiper初始化后，bottomSwiper控制topSwiper
		controlSwiper3 = new Swiper('#swiper-container3', {
			control: [topSwiper, bottomSwiper]//控制前面两个Swiper
		})

	},

	slideArticle: function () {
		if (frame1) {
			frame1.destroy();
			frame1 = "";
		}
		var $element = $(".article-content .video-slide-content.swiper-slide-active");
		var scrollbar = $element.find(".mask-layer-scrollbar"),
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
		var scrollbarId = $element.find(".article-scroll-content").attr("id");
		frame1 = new Sly('#' + scrollbarId, options).init();
	},

	events: {
		left: function (type) {
			this.props.maskLayerLeft(type);
		},

		right: function (type) {
			this.props.maskLayerRight(type);
		},

		selectArticle: function (id) {
			console.log("bottomSwiper.clickedIndex:" + bottomSwiper.clickedIndex);
			topSwiper ? topSwiper.slideTo(bottomSwiper.clickedIndex, 1000, false) : "";
			this.props.selectArticle(id);
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
							<div className="left-arrow swiper-button-prev"></div>
							<div className="right-arrow swiper-button-next"></div>
							<div className="swiper-container slide-container">
								<div className="swiper-wrapper">
									{
										dataList.map(function (modern, i) {
											return (
												<div key={i} className="swiper-slide video-slide-content"
													 data-id={modern.id}>
													<div>
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
												</div>
											)
										})
									}
								</div>
							</div>
						</div>
						<div className="bottom-slide-contnet">
							<div className="left-arrow swiper-button-prev"></div>
							<div className="right-arrow swiper-button-next"></div>
							<div className="swiper-container slide-container">
								<div className="swiper-wrapper">
									{
										dataList.map(function (article, i) {
											var cls = classNames({
												'article-li swiper-slide': true,
												'article-li-isSelect': article.isSelect
											});
											return (
												<div key={i} className={cls} data-id={article.id}
													 onClick={_this.events.selectArticle.bind(_this,article.id)}>
													<div className="article-img">
														<img src={article.preview}/>
													</div>
													<div className="article-name">
														{article.name}
													</div>
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
							<div className="left-arrow swiper-button-prev"></div>
							<div className="right-arrow swiper-button-next"></div>
							<div className="swiper-container slide-container">
								<div className="swiper-wrapper">
									{
										dataList.map(function (modern, i) {
											return (
												<div key={i} className="swiper-slide video-slide-content">
													{videoRegular.test(modern.video) ?
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
														</div>
														:
														<div>
															<div className="video-img">
																<img src={modern.preview}/>
															</div>
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
							<div className="left-arrow swiper-button-prev"></div>
							<div className="right-arrow swiper-button-next"></div>
							<div className="swiper-container  slide-container">
								<div className="swiper-wrapper">
									{
										dataList.map(function (modern, i) {
											return (
												<div key={i} className="swiper-slide preview-slide-content">
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