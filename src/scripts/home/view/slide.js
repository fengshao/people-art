/**
 * Created by fengs on 2017/9/16.
 */
require('../style/home.scss');

var SlideCompent = React.createClass({
	componentDidMount: function () {
		this.slideInit();
		this.props.Slide.k_touch($(".slide-container"));
	},

	componentDidUpdate: function () {
		this.slideInit();
	},

	slideInit: function () {
		var _this = this;
		switch (_this.props.isSelectPerformeInfoNavId) {
			case "1":
				_this.props.Slide.initSlide($(".modern-contnet"));
				break;
			case "2":
				_this.props.Slide.initSlide($(".he-institute-contnet"));
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
						<div className="left-arrow"
							 onClick={_this.events.left.bind(_this,"modern-contnet")}></div>
						<div className="right-arrow"
							 onClick={_this.events.right.bind(_this,"modern-contnet")}></div>
						<div className="slide-container">
							<div id="slide" className="index-slide slide" alt="star">
								{
									modernList.map(function (modern, i) {
										return (
											<div key={i} className="img modern-slide-content">
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
					</div>
				);
				break;
			case "2":
				return (
					<div className="he-institute-contnet">
						<div className="left-arrow"
							 onClick={_this.events.left.bind(_this,"he-institute-contnet")}></div>
						<div className="right-arrow"
							 onClick={_this.events.right.bind(_this,"he-institute-contnet")}></div>
						<div className="slide-container">
							<div id="slide" className="index-slide slide" alt="star">
								{
									heInstituteList.map(function (heInstitute, i) {
										return (
											<div key={i} className="img he-institute-slide-content">
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
											<div key={i} className="img movies-slide-content">
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
																<div key={i} className="article-li">
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