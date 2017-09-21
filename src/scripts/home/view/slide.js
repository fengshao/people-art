/**
 * Created by fengs on 2017/9/16.
 */
// require('../style/home.scss');

var SlideCompent = React.createClass({
	componentDidMount: function () {
		this.slideInit();
	},

	componentDidUpdate: function () {
		// this.slideInit();
	},

	slideInit: function () {
		var _this = this;
		switch (_this.props.isSelectPerformeInfoNavId) {
			case "1":
				var swiper = new Swiper('.bottom-content .swiper-container', {
					loop: true,
					effect: 'coverflow',
					grabCursor: true,
					centeredSlides: true,
					slidesPerView: 'auto',
					coverflow: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true
					},
					nextButton: '.bottom-content .swiper-button-next',
					prevButton: '.bottom-content .swiper-button-prev'
				});
				break;
			case "2":
				var mySwiper = new Swiper('.swiper-container', {
					loop: true,
					// 如果需要前进后退按钮
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev'
				});
				break;
			case "3":
				_this.props.Slide.initSlide($(".movies-contnet"));
				break;
			case "4":
				_this.props.Slide.initSlide($(".article-contnet"));
				break;
		}
	},

	events: {
		left: function (element) {
			this.props.Slide.left($("." + element));
		},

		right: function (element) {
			this.props.Slide.right($("." + element));
		},

		showMaskLayer: function (data, element, event) {
			var classNmae = event.currentTarget.className;
			if (classNmae.indexOf("swiper-slide-active") != -1 || classNmae.indexOf("article-li") != -1) {
				this.props.showMaskLayer();
			}
		}

	},

	createSlideContent: function () {
		var _this = this;

		var modernList = this.props.performer.modernList;
		var heInstituteList = this.props.performer.heInstituteList;
		var moviesList = this.props.performer.moviesList;
		var articleList = this.props.performer.articleList;

		// var videoRegular = /^https?.+\.(mp4|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|png)$/i;
		var videoRegular = /\.(mp4|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb)$/i;

		switch (_this.props.isSelectPerformeInfoNavId) {
			case "1":
				return (
					<div className="modern-contnet">
						<div className="swiper-container ">
							<div className="swiper-wrapper slide-container">
								{
									modernList.map(function (modern, i) {
										return (
											<div key={i} className="swiper-slide modern-slide-content"
												 onClick={_this.events.showMaskLayer.bind(_this,modern, "modern-contnet")}>
												<div className="modern-name">{modern.name}</div>
												<div className="modern-img">
													<img src={modern.preview}/>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
						<div className="left-arrow swiper-button-prev"></div>
						<div className="right-arrow swiper-button-next"></div>
					</div>
				);
				break;
			case "2":
				return (
					<div className="swiper-container he-institute-contnet">
						<div className="swiper-wrapper">
							<div className="swiper-slide">Slide 1</div>
							<div className="swiper-slide">Slide 2</div>
							<div className="swiper-slide">Slide 3</div>
						</div>
						<div className="swiper-button-prev"></div>
						<div className="swiper-button-next"></div>
					</div>
				);
				break;
			case "3":
				return (
					<div className="movies-contnet">
						<div className="left-arrow"
							 onClick={_this.events.left.bind(_this,"movies-contnet")}></div>
						<div className="right-arrow"
							 onClick={_this.events.right.bind(_this,"movies-contnet")}></div>
						<div className="slide-container">
							<div id="slide" className="index-slide slide" alt="star">
								{
									moviesList.map(function (movies, i) {
										return (
											<div key={i} className="img movies-slide-content"
												 onClick={_this.events.showMaskLayer.bind(_this,movies, "movies-contnet")}>
												<div className="movies-name">
													<p>{movies.name}</p>
												</div>
												<div className="movies-img">
													<img src={movies.preview}/>
													{
														videoRegular.test(movies.video) ?
															<div className="suspend-logo"></div> : null
													}
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
				);
				break;

			case "4":

				var length = Math.ceil(articleList.length / 4);
				var arrTest = [];
				for (let i = 0; i < length; i++) {
					arrTest.push(i);
				}

				return (
					<div className="article-contnet">
						<div className="left-arrow"
							 onClick={_this.events.left.bind(_this,"article-contnet")}></div>
						<div className="right-arrow"
							 onClick={_this.events.right.bind(_this,"article-contnet")}></div>
						<div className="slide-container">
							<div id="slide" className="index-slide slide" alt="star">
								{
									arrTest.map(function (index, key) {

										return (
											<div className="img article-slide-content" key={key}>
												{
													articleList.map(function (article, i) {
														return (
															i < 4 * (key + 1) && i >= 4 * key ?
																<div key={i} className="article-li" data-img-index={i}
																	 onClick={_this.events.showMaskLayer.bind(_this,i, "article-contnet")}>
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
				);
				break;

		}
	},

	render(){
		var _this = this;
		return (
			<div className="slide-content">
				{
					_this.createSlideContent()
				}
			</div>
		)
	}
});
module.exports = SlideCompent;