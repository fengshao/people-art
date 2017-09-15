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
									this.props.imgDatas.map(function (goodsTypeID, i) {
										return (
											<div key={i} className="img modern-slide-content">
												<div className="modern-name">{goodsTypeID.name}</div>
												<div className="modern-img">
													<img src={goodsTypeID.img}/>
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
									this.props.imgDatas.map(function (goodsTypeID, i) {
										return (
											<div key={i} className="img he-institute-slide-content">
												<div className="he-institute-name">
													<p>{goodsTypeID.name}</p>
												</div>
												<div className="he-institute-img">
													<img src={goodsTypeID.img}/>
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
									this.props.imgDatas.map(function (goodsTypeID, i) {
										return (
											<div key={i} className="img movies-slide-content">
												<div className="movies-name">
													<p>{goodsTypeID.name}</p>
												</div>
												<div className="movies-img">
													<img src={goodsTypeID.img}/>
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

				var imgDatas = this.props.imgDatas;
				var length = Math.ceil(imgDatas.length / 4);
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
													imgDatas.map(function (goodsTypeID, i) {
														return (
															i < 4 * (key + 1) && i >= 4 * key ?
																<div key={i} className="article-li">
																	<div className="article-img">
																		<img src={goodsTypeID.img}/>
																	</div>
																	<div className="article-name">
																		{goodsTypeID.name}
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
							<div className="actor-name">濮存昕</div>
							<div className="actor-img">
								<img src={actorImg} alt="暂无图片"/>
							</div>
						</div>
						<div className="right-content">
							<div className="educational-information">
								<div className="arrival-time-content">
									<span className="educational-title">来院时间：</span>
									<span className="educational-content">2017年9月14日</span>
								</div>
								<div className="university-from-content">
									<span className="educational-title">毕业院校：</span>
									<span className="educational-content">北京xxxxxx院校</span>
								</div>
							</div>

							<div className="personalized-signature">
								最喜欢的一句话获北京东方化工厂和北京人民艺术剧院联合举行的青年演员进步奖评选之“云燕杯”奖
							</div>

							<div className="brief-introduction">
								濮存昕，北京人民艺术剧院副院长，国家一级演员，中国戏剧家协会主席，全国政协委员。
								从事戏剧影视表演艺术多年，主演过数十部话剧、电影、电视剧作品，多次获国内外大奖。
								代表作品有话剧《李白》、《茶馆》、《天之骄子》等
								，电视剧《英雄无悔》、《来来往往》、《光荣之旅》，电影《洗澡》、《一轮明月》等。
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
									<div className="bottom-info-title">其他作品电视剧:</div>
									<div className="bottom-info-content"> 1984年 《中国姑娘》；
									</div>
									<div className="bottom-info-content"> 《三国演义》中饰演孙策
									</div>
									<div className="bottom-info-content"> 1991年 《梧桐梧桐》中饰演刘小岸；《编辑部的故事》中饰演诗人田乔
									</div>
									<div className="bottom-info-content"> 1994年 《长天烽火》中饰演大哥；《我爱我家》中饰演阿文
									</div>
									<div className="bottom-info-content"> 1996年
										《英雄无悔》中饰演高天；《一场风花雪月的事》中饰演记者；《运河人家》中饰演叶三车
									</div>
									<div className="bottom-info-content"> 1998年 《来来往往》中饰演康伟业
									</div>
									<div className="bottom-info-content"> 1999年 《尊严》中饰演李岩；《镜花缘传奇》中饰演李世民
									</div>
									<div className="bottom-info-content"> 2000年 《堆积情感·男人篇》中饰演李皓；《光荣之旅》中饰演贺援朝
									</div>
									<div className="bottom-info-content"> 2002年 《曹操与蔡文姬》中饰演曹操；《失乐园》中饰演权正阳；《公安局长》
									</div>
									<div className="bottom-info-content"> 2004年 《天下第一楼》中饰演修鼎新
									</div>
									<div className="bottom-info-content"> 2004年 《公安局长2》中饰演黎剑
									</div>
									<div className="bottom-info-content"> 2007年 《男人底线》中饰演魏海峰
									</div>
									<div className="bottom-info-content"> 2009年 《闯关东2》中饰演魏德民
									</div>
									<div className="bottom-info-content"> 2010年 《为爱而生》中饰演林尚斌
									</div>
									<div className="bottom-info-content"> 2011年 《金太郎的幸福生活》中饰演教授
									</div>
									<div className="bottom-info-content"> 2012年 《推拿》中饰演沙复明
									</div>
									<div className="bottom-info-content"> 电影：
									</div>
									<div className="bottom-info-content"> 1979年 《山重水复》中饰演游击队员
									</div>
									<div className="bottom-info-content"> 1986年 《大漠紫禁令》中饰演李七郎
									</div>
									<div className="bottom-info-content"> 1989年 《最后的贵族》中饰演陈寅
									</div>
									<div className="bottom-info-content"> 1991年 《清凉寺的钟声》中饰演明镜法师
									</div>
									<div className="bottom-info-content"> 1995年 《与往事干杯》中饰演宋医生
									</div>
									<div className="bottom-info-content"> 1997年 《伴你到黎明》
									</div>
									<div className="bottom-info-content"> 1999年 《说好不分手》中饰演滕远峰
									</div>
									<div className="bottom-info-content"> 2000年 《洗澡》中饰演大明
									</div>
									<div className="bottom-info-content"> 2005年 《鲁迅》中饰演鲁迅；《一轮明月》中饰演李叔同
									</div>
									<div className="bottom-info-content"> 2011年 《最爱》中饰演赵齐全
									</div>
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
									<div className="bottom-info-title">其他作品电视剧:</div>
									<div className="bottom-info-content"> 1984年 《中国姑娘》；
									</div>
									<div className="bottom-info-content"> 《三国演义》中饰演孙策
									</div>
									<div className="bottom-info-content"> 1991年 《梧桐梧桐》中饰演刘小岸；《编辑部的故事》中饰演诗人田乔
									</div>
									<div className="bottom-info-content"> 1994年 《长天烽火》中饰演大哥；《我爱我家》中饰演阿文
									</div>
									<div className="bottom-info-content"> 1996年 《英雄无悔》中饰演高天；《一场风花雪月的事》中饰演记者；《运河人家》中饰演叶三车
									</div>
									<div className="bottom-info-content"> 1998年 《来来往往》中饰演康伟业
									</div>
									<div className="bottom-info-content"> 1999年 《尊严》中饰演李岩；《镜花缘传奇》中饰演李世民
									</div>
									<div className="bottom-info-content"> 2000年 《堆积情感·男人篇》中饰演李皓；《光荣之旅》中饰演贺援朝
									</div>
									<div className="bottom-info-content"> 2002年 《曹操与蔡文姬》中饰演曹操；《失乐园》中饰演权正阳；《公安局长》
									</div>
									<div className="bottom-info-content"> 2004年 《天下第一楼》中饰演修鼎新
									</div>
									<div className="bottom-info-content"> 2004年 《公安局长2》中饰演黎剑
									</div>
									<div className="bottom-info-content"> 2007年 《男人底线》中饰演魏海峰
									</div>
									<div className="bottom-info-content"> 2009年 《闯关东2》中饰演魏德民
									</div>
									<div className="bottom-info-content"> 2010年 《为爱而生》中饰演林尚斌
									</div>
									<div className="bottom-info-content"> 2011年 《金太郎的幸福生活》中饰演教授
									</div>
									<div className="bottom-info-content"> 2012年 《推拿》中饰演沙复明
									</div>
									<div className="bottom-info-content"> 电影：
									</div>
									<div className="bottom-info-content"> 1979年 《山重水复》中饰演游击队员
									</div>
									<div className="bottom-info-content"> 1986年 《大漠紫禁令》中饰演李七郎
									</div>
									<div className="bottom-info-content"> 1989年 《最后的贵族》中饰演陈寅
									</div>
									<div className="bottom-info-content"> 1991年 《清凉寺的钟声》中饰演明镜法师
									</div>
									<div className="bottom-info-content"> 1995年 《与往事干杯》中饰演宋医生
									</div>
									<div className="bottom-info-content"> 1997年 《伴你到黎明》
									</div>
									<div className="bottom-info-content"> 1999年 《说好不分手》中饰演滕远峰
									</div>
									<div className="bottom-info-content"> 2000年 《洗澡》中饰演大明
									</div>
									<div className="bottom-info-content"> 2005年 《鲁迅》中饰演鲁迅；《一轮明月》中饰演李叔同
									</div>
									<div className="bottom-info-content"> 2011年 《最爱》中饰演赵齐全
									</div>
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