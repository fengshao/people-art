/**
 * Created by fengs on 2017/9/16.
 */
// require('../style/home.scss');
var swiper = "";
var SlideCompent = React.createClass({
	componentDidMount: function () {
		this.slideInit();
	},

	componentDidUpdate: function () {
		this.slideInit();
	},

	slideInit: function () {
		var _this = this;
		swiper ? swiper.destroy(true, true) : "";
		switch (_this.props.isSelectPerformeInfoNavId) {
			case "1":
				swiper = new Swiper('.bottom-content .modern-contnet .swiper-container', {
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
					nextButton: '.bottom-content .modern-contnet .swiper-button-next',
					prevButton: '.bottom-content .modern-contnet .swiper-button-prev'
				});
				break;
			case "2":
				swiper = new Swiper('.bottom-content .he-institute-contnet .swiper-container', {
					loop: true,
					// 如果需要前进后退按钮
					nextButton: '.bottom-content .he-institute-contnet .swiper-button-next',
					prevButton: '.bottom-content .he-institute-contnet .swiper-button-prev'
				});
				break;
			case "3":
				swiper = new Swiper('.bottom-content .movies-contnet .swiper-container', {
					loop: true,
					// 如果需要前进后退按钮
					nextButton: '.bottom-content .movies-contnet .swiper-button-next',
					prevButton: '.bottom-content .movies-contnet .swiper-button-prev'
				});
				break;
			case "4":
				swiper = new Swiper('.bottom-content .article-contnet .swiper-container', {
					slidesPerView: 4,
					//centeredSlides: true,
					spaceBetween: 60,
					loop: true,
					// 如果需要前进后退按钮
					nextButton: '.bottom-content .article-contnet .swiper-button-next',
					prevButton: '.bottom-content .article-contnet .swiper-button-prev'
				});
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
					<div className="he-institute-contnet">
						<div className="swiper-container ">
							<div className="swiper-wrapper slide-container">
								{
									heInstituteList.map(function (heInstitute, i) {
										return (
											<div key={i} className="swiper-slide he-institute-slide-content"
												 onClick={_this.events.showMaskLayer.bind(_this,heInstitute, "he-institute-contnet")}>
												<div className="he-institute-name">
													<p>{heInstitute.name}</p>
												</div>
												<div className="he-institute-img">
													<img src={heInstitute.preview}/>
													{
														videoRegular.test(heInstitute.video) ?
															<div className="suspend-logo"></div> : null
													}
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
			case "3":
				return (
					<div className="movies-contnet">

						<div className="swiper-container ">
							<div className="swiper-wrapper slide-container">
								{
									moviesList.map(function (movies, i) {
										return (
											<div key={i} className="swiper-slide movies-slide-content"
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
						<div className="left-arrow swiper-button-prev"></div>
						<div className="right-arrow swiper-button-next"></div>
					</div>
				);
				break;

			case "4":

				return (
					<div className="article-contnet">
						<div className="swiper-container ">
							<div className="swiper-wrapper slide-container">
								{
									articleList.map(function (article, i) {
										return (
											<div key={i} className="article-li swiper-slide"
												 onClick={_this.events.showMaskLayer.bind(_this,i, "article-contnet")}>
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
						<div className="left-arrow swiper-button-prev"></div>
						<div className="right-arrow swiper-button-next"></div>
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