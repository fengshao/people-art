/**
 * Created by fengs on 2017/9/13.
 */
require('../style/performer-info.scss');
import classNames from 'classnames';
import Slide from '../../../component/slide';

var actorImg = require("../../../images/performer-info/the-actor.png");
var PerformerInfo = React.createClass({

	componentDidMount: function () {
		var cont = $(".performer-info-content"),
			scrollbar = cont.find(".teleplay-works-scrollbar"),
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
		var cont1 = $(".performer-info-content"),
			scrollbar1 = cont1.find(".honour-record-scrollbar"),
			options1 = {
				"horizontal": 0,
				"itemNav": "basic",
				"dragContent": 1,
				scrollBar: scrollbar1,
				mouseDragging: 1,
				touchDragging: 1,
				scrollBy: 1,
				dynamicHandle: true
			};
		var frame = new Sly('#teleplay-works-scrollbar-content', options).init();
		var frame1 = new Sly('#honour-record-scrollbar-content', options1).init();

		this.slideInit();
		Slide.k_touch($(".slide-container"));

	},
	componentDidUpdate: function () {
		this.slideInit();
	},

	slideInit: function () {
		var _this = this;
		switch (_this.props.isSelectPerformeInfoNavId) {
			case "1":
				Slide.initSlide($(".modern-contnet"));
				break;
			case "2":
				Slide.initSlide($(".he-institute-contnet"));
				break;
			case "3":
				Slide.initSlide($(".movies-contnet"));
				break;
			case "4":
				Slide.initSlide($(".article-contnet"));
				break;
		}
	},

	events: {
		left: function (element) {
			Slide.left($("." + element));
		},

		right: function (element) {
			Slide.right($("." + element));
		},

		selectPerformeInfoNav: function (id, ele) {

			var _this = this;
			switch (_this.props.isSelectPerformeInfoNavId) {
				case "1":
					Slide.removeEventFnc($(".modern-contnet"));
					break;
				case "2":
					Slide.removeEventFnc($(".he-institute-contnet"));
					break;
				case "3":
					Slide.removeEventFnc($(".movies-contnet"));
					break;
				case "4":
					Slide.removeEventFnc($(".article-contnet"));
					break;
			}
			_this.props.selectPerformeInfoNav(id);
		}
	},

	createSlideContent: function () {
		var _this = this;

		var modernList = this.props.performer.modernList;
		var heInstituteList = this.props.performer.heInstituteList;
		var moviesList = this.props.performer.moviesList;
		var articleList = this.props.performer.articleList;

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

		var performer = this.props.performer;
		var _this = this;
		var performerSlyCls = classNames({
			'top-content': true,
			'top-content-open': this.props.isPerformerInfoDropDown
		});

		var topArrowCls = classNames({
			'top-arrow': true,
			'top-arrow-open': this.props.isPerformerInfoDropDown
		});

		return (
			<div className="performer-info-content">
				<div className={topArrowCls} onClick={this.props.performerInfoDropDown.bind(this,"id")}></div>
				<div className={performerSlyCls}>
					<div className="top-info">
						<div className="left-content">
							<div className="actor-name">{performer.actorName}</div>
							<div className="actor-img">
								<img src={performer.headPortrait} alt="暂无图片"/>
							</div>
						</div>
						<div className="right-content">
							<div className="educational-information">
								<div className="arrival-time-content">
									<span className="educational-title">来院时间：</span>
									<span className="educational-content">{performer.educationalTime}</span>
								</div>
								<div className="university-from-content">
									<span className="educational-title">毕业院校：</span>
									<span className="educational-content">{performer.educationalSchool}</span>
								</div>
							</div>

							<div className="personalized-signature">
								{performer.personalizedSignature}
							</div>

							<div className="brief-introduction">
								{performer.briefIntroduction}
							</div>
						</div>
					</div>

					<div className="bottom-info">
						<div className="teleplay-works">
							<div className="teleplay-works-scrollbar bottom-info-scrollbar">
								<div className="handle"></div>
							</div>
							<div className="teleplay-works-scrollbar-content" id="teleplay-works-scrollbar-content">
								<div>
									{performer.teleplayWorks}
									<div></div>
								</div>
							</div>

						</div>
						<div className="honour-record">
							<div className="honour-record-scrollbar bottom-info-scrollbar">
								<div className="handle"></div>
							</div>
							<div className="honour-record-scrollbar-content" id="honour-record-scrollbar-content">
								<div>
									{performer.honourRecord}
									<div></div>
								</div>
							</div>
						</div>


					</div>

					<div className="top-right-logo"></div>
				</div>
				<div className="bottom-content">
					<div className="nav-content">
						{
							this.props.performeInfoNavList.map(function (performeInfoNav, index) {
								var topArrowCls = classNames({
									'nav-li': true,
									'nav-li-select': performeInfoNav.isSelect
								});
								return (
									<div onClick={_this.events.selectPerformeInfoNav.bind(_this, performeInfoNav.id)}
										 className={topArrowCls} key={index} data-id={performeInfoNav.id}>
										<div className="nav-li-title">{performeInfoNav.name}</div>
									</div>
								)
							})
						}

					</div>
					<div className="slide-content">
						{
							_this.createSlideContent()
						}
					</div>
				</div>
				<div className="foter-content">
					<div className="back-off" onClick={this.props.backOff.bind(this,"performerList")}></div>
				</div>
			</div>
		);
	}
});
module.exports = PerformerInfo;