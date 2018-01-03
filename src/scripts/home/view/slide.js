/**
 * Created by fengs on 2017/9/16.
 */
// require('../style/home.scss');
var articleImg = require("../../../images/performer-info/article-img.png");

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
		swiper ? swiper.destroy(true, true)  : swiper = "";
		swiper = "";
		switch (_this.props.isSelectPerformeInfoNavId) {
			case "1":
				if (_this.props.performer.modernList && _this.props.performer.modernList.length > 0) {
					swiper = new Swiper('.bottom-content .modern-contnet .swiper-container', {
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
				}
				break;
			case "2":
				if (_this.props.performer.heInstituteList && _this.props.performer.heInstituteList.length > 0) {
					swiper = new Swiper('.bottom-content .he-institute-contnet .swiper-container', {
						// 如果需要前进后退按钮
						nextButton: '.bottom-content .he-institute-contnet .swiper-button-next',
						prevButton: '.bottom-content .he-institute-contnet .swiper-button-prev'
					});
				}
				break;
			case "3":
				if (this.props.performer.moviesList && this.props.performer.moviesList.length > 0) {
					swiper = new Swiper('.bottom-content .movies-contnet .swiper-container', {
						// 如果需要前进后退按钮
						nextButton: '.bottom-content .movies-contnet .swiper-button-next',
						prevButton: '.bottom-content .movies-contnet .swiper-button-prev'
					});
				}
				break;
			case "4":
				if (_this.props.performer.articleList && _this.props.performer.articleList.length > 0) {
					swiper = new Swiper('.bottom-content .article-contnet .swiper-container', {
						slidesPerView: 4,
						spaceBetween: 60,
						// 如果需要前进后退按钮
						nextButton: '.bottom-content .article-contnet .swiper-button-next',
						prevButton: '.bottom-content .article-contnet .swiper-button-prev'
					});
				}
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

		showMaskLayer: function (id, dataList, event) {
			var clickedIndex = swiper.clickedIndex;
			var classNmae = event.currentTarget.className;
			if (classNmae.indexOf("swiper-slide-active") != -1 || classNmae.indexOf("article-li") != -1) {
				this.props.showMaskLayer(clickedIndex, id, dataList);
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
					modernList && modernList.length > 0 ? (<div className="modern-contnet">
						<div className="swiper-container ">
							<div className="swiper-wrapper slide-container">
								{
									modernList && modernList.map(function (modern, i) {
										return (
											<div key={i} className="swiper-slide modern-slide-content"
												 onClick={_this.events.showMaskLayer.bind(_this,modern.Id, modern.Ablum)}>
												<div className="modern-name">{modern.Name}</div>
												<div className="modern-img">
													<img src={modern.Preview}/>
												</div>
											</div>
										)
									})
								}
							</div>
						</div>
						<div className="left-arrow swiper-button-prev"></div>
						<div className="right-arrow swiper-button-next"></div>
					</div>) : (<div className="no-data-cls">暂无作品，请查看其他作品。</div>)
				);
				break;
			case "2":
				return (
					heInstituteList && heInstituteList.length > 0 ? (<div className="he-institute-contnet">
						<div className="swiper-container ">
							<div className="swiper-wrapper slide-container">
								{
									heInstituteList && heInstituteList.map(function (heInstitute, i) {
										return (
											<div key={i} className="swiper-slide he-institute-slide-content"
												 onClick={_this.events.showMaskLayer.bind(_this,heInstitute.Id, heInstitute.Ablum)}>
												<div className="he-institute-name">
													<p>{heInstitute.Name}</p>
												</div>
												<div className="he-institute-img">
													<img src={heInstitute.Preview}/>
													{
														videoRegular.test(heInstitute.Video) ?
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
					</div>) : <div className="no-data-cls">暂无作品，请查看其他作品。</div>
				);
				break;
			case "3":
				return (
					moviesList && moviesList.length > 0 ? (<div className="movies-contnet">
						<div className="swiper-container ">
							<div className="swiper-wrapper slide-container">
								{
									moviesList && moviesList.map(function (movies, i) {
										return (
											<div key={i} className="swiper-slide movies-slide-content"
												 onClick={_this.events.showMaskLayer.bind(_this,movies.Id, moviesList)}>
												<div className="movies-name">
													<p>{movies.Name}</p>
												</div>
												<div className="movies-img">
													<img src={movies.Preview}/>
													{
														videoRegular.test(movies.Video) ?
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
					</div>) : <div className="no-data-cls">暂无作品，请查看其他作品。</div>
				);
				break;

			case "4":
				return (
					articleList && articleList.length > 0 ? (<div className="article-contnet">
						<div className="swiper-container ">
							<div className="swiper-wrapper slide-container">
								{
									articleList && articleList.map(function (article, i) {
										return (
											<div key={i} className="article-li swiper-slide"
												 onClick={_this.events.showMaskLayer.bind(_this,article.article_id, articleList)}>
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
						<div className="left-arrow swiper-button-prev"></div>
						<div className="right-arrow swiper-button-next"></div>
					</div>) : <div className="no-data-cls">暂无作品，请查看其他作品。</div>
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