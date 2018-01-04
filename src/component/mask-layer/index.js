/**
 * Created by fengs on 2017/9/16.
 */
require('./index.scss');
var articleImg = require("../../images/performer-info/article-img.png");
import classNames from 'classnames';
var frame1 = "";
var topSwiper = "";
var bottomSwiper = "";
var controlSwiper3 = "";
var dataList = [];
var content = '<img class="photo-swipe" data-title="teststsststststst" data-big="https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg" data-size="964x1024" src="https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_m.jpg" alt="Image description" style="width: 1000px;height: 500px" /> <div> <img class="photo-swipe" data-big="https://farm3.staticflickr.com/2567/5697107145_a4c2eaa0cd_o.jpg" data-size="1024x1024" src="https://farm3.staticflickr.com/2567/5697107145_3c27ff3cd1_m.jpg" alt="Image description"/> </div> <img class="photo-swipe" data-big="https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg" data-size="1024x683" src="https://farm7.staticflickr.com/6175/6176698785_7dee72237e_m.jpg" alt="Image description"/> <img class="photo-swipe" data-big="https://farm6.staticflickr.com/5023/5578283926_822e5e5791_b.jpg" data-size="1024x768" src="https://farm6.staticflickr.com/5023/5578283926_822e5e5791_m.jpg" alt="Image description"/>'
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
			initialSlide: this.props.clickedIndex,
			onSlideChangeEnd: function (swiper) {
				if (_this.props.isSelectPerformeInfoNavId == 4) {
					// _this.slideArticle();
					let $articleElement = $(".article-content .top-slide-contnet .video-slide-content.swiper-slide-active");
					_this.props.selectArticle($articleElement.attr("data-id"));
				}

			},
			onSlideChangeStart: function (swiper) {
				for (let i = 0; i < $(".media-video").length; i++) {
					$(".media-video")[i].pause();
				}

				$(".preview-content").fadeOut(1000, function () {
					let $element = $(".top-slide-contnet .video-slide-content.swiper-slide-active");
					var id = $element.attr("data-id");
					_this.props.changePreview(id, dataList);
					$(".preview-content").fadeIn();
				});
				$(".next-content").fadeOut(1000, function () {
					$(".next-content").fadeIn();
				});
			}
		});


		if (this.props.isSelectPerformeInfoNavId == 4) {
			bottomSwiper = new Swiper('.bottom-slide-contnet .swiper-container', {
				// slidesPerView: 3,
				// centeredSlides: true,
				spaceBetween: 50,
				// freeMode: true,

				grabCursor: true,
				// centeredSlides: true,
				slidesPerView: 'auto',

				// 如果需要前进后退按钮
				initialSlide: this.props.clickedIndex,
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
				slideToClickedSlide: true,
				centeredSlides: true,
				freeMode: true,
				freeModeSticky: true,
				slidesPerView: 'auto',
				initialSlide: this.props.clickedIndex,
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

		// topSwiper.params.control = bottomSwiper;//需要在bottomSwiper初始化后，topSwiper控制bottomSwiper
		// bottomSwiper.params.control = topSwiper;//需要在topSwiper初始化后，bottomSwiper控制topSwiper
		// controlSwiper3 = new Swiper('#swiper-container3', {
		// 	control: [topSwiper, bottomSwiper]//控制前面两个Swiper
		// })

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

		clickBottomSwipe: function (type) {
			debugger
			topSwiper.slideTo(bottomSwiper.activeIndex, 1000, false);
		},

		selectArticle: function (id) {
			topSwiper ? topSwiper.slideTo(bottomSwiper.clickedIndex, 1000, false) : "";
			var _this = this;
			this.props.selectArticle(id);
			$(".preview-content").fadeOut(1000, function () {
				_this.props.changePreview(id, dataList);
				$(".preview-content").fadeIn();
			});
			$(".next-content").fadeOut(1000, function () {
				$(".next-content").fadeIn();
			});
		}

	},

	render(){
		var title = "";
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
		var length = Math.ceil((dataList.length || 0) / 3);
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
							<div className="preview-content">
								{
									this.props.previewContent ?
										<div dangerouslySetInnerHTML={{__html : this.props.previewContent }}>
										</div>
										: null
								}
							</div>
							<div className="next-content">
								{
									this.props.nextContent ?
										<div dangerouslySetInnerHTML={{__html : this.props.nextContent }}>
										</div>
										: null
								}
							</div>

							<div className="left-arrow swiper-button-prev"></div>
							<div className="right-arrow swiper-button-next"></div>
							<div className="swiper-container slide-container">
								<div className="swiper-wrapper">
									{
										dataList.map(function (modern, i) {
											return (
												<div key={i} className="swiper-slide video-slide-content"
													 data-id={modern.article_id}>
													<div className="article-scroll-content"
														 id={"maskLayer" + modern.article_id}
														 data-pswp-uid={i+1}
														 onClick={_this.props.onThumbnailsClick.bind(_this)}>
														<div
															dangerouslySetInnerHTML={{__html : modern.content }}>
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
												<div key={i} className={cls} data-id={article.article_id}
													 onClick={_this.events.selectArticle.bind(_this,article.article_id)}>
													<div className="article-img">
														<img src={articleImg}/>
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

						<div className="pswp pswp_custom" tabindex="-1" role="dialog" aria-hidden="true">
							<div className="pswp__bg"></div>
							<div className="pswp__scroll-wrap">
								<div className="pswp__container">
									<div className="pswp__item"></div>
									<div className="pswp__item"></div>
									<div className="pswp__item"></div>
								</div>
								<div className="pswp__ui pswp__ui--hidden">
									<div className="pswp__top-bar">
										<div className="pswp__counter"></div>
										<button className="pswp__button pswp__button--close"
												title="Close (Esc)"></button>
										<div className="pswp__preloader">
											<div className="pswp__preloader__icn">
												<div className="pswp__preloader__cut">
													<div className="pswp__preloader__donut"></div>
												</div>
											</div>
										</div>
									</div>
									<div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
										<div className="pswp__share-tooltip"></div>
									</div>
									<button className="pswp__button pswp__button--arrow--left"
											title="Previous (arrow left)">
									</button>
									<button className="pswp__button pswp__button--arrow--right"
											title="Next (arrow right)">
									</button>
									<div className="pswp__caption">
										<div className="pswp__caption__center pswp__caption__center_custom"></div>
									</div>
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
							<div className="preview-content">
								{
									this.props.previewContent ?
										<img src={this.props.previewContent}/>
										: null
								}
							</div>
							<div className="next-content">
								{
									this.props.nextContent ?
										<img src={this.props.nextContent}/>
										: null
								}
							</div>
							<div className="swiper-container slide-container">
								<div className="swiper-wrapper">
									{
										dataList.map(function (modern, i) {
											//let id = "", video = "", preview = "";
											//switch (_this.props.isSelectPerformeInfoNavId) {
											//	case "1":
											//		id = modern.id;
											//		video = modern.modernList;
											//		preview = modern.modernList;
											//		break;
											//	case "2":
											//		id = modern.id;
											//		video = modern.modernList;
											//		preview = modern.modernList;
											//		break;
											//	case "3":
											//		id = modern.m_a_id;
											//		video = modern.m_path;
											//		preview = modern.preview;
											//		break;
											//}
											return (
												<div key={i} className="swiper-slide video-slide-content"
													 data-id={modern.Id}>
													{videoRegular.test(modern.Video) ?
														<div className="video-img" id={"maskLayer" + modern.Id}>
															<div className={maskLayerSuspendCls}
																 onClick={_this.props.maskLayerControl.bind(_this,"maskLayer" + modern.Id)}></div>
															<video ref='media' className="media-video"
																   type='video/mp4'
																   loop="loop"
																   preload="preload"
																   webkit-playsinline="true"
																   src={modern.Video ? modern.Video : ""}
																   poster={modern.Preview ? modern.Preview : ""}
															>
															</video>
														</div>
														:
														<div>
															<div className="video-img">
																<img src={modern.Preview}/>
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
											//let id = "", name = "", preview = "";
											//switch (_this.props.isSelectPerformeInfoNavId) {
											//	case "1":
											//		id = modern.id;
											//		name = modern.name;
											//		preview = modern.modernList;
											//		break;
											//	case "2":
											//		id = modern.id;
											//		name = modern.name;
											//		preview = modern.modernList;
											//		break;
											//	case "3":
											//		id = modern.m_a_id;
											//		name = modern.m_name;
											//		preview = modern.preview;
											//		break;
											//}
											return (
												<div key={i} className="swiper-slide preview-slide-content"
													 onClick={_this.events.clickBottomSwipe.bind(_this)}>
													<div className="modern-img">
														<img src={modern.Preview}/>
													</div>
													<div className="modern-name">{modern.Name}</div>
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