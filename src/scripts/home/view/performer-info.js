/**
 * Created by fengs on 2017/9/13.
 */
require('../style/performer-info.scss');
import classNames from 'classnames';
import Slide from '../../../component/slide';
import SlideCompent from './slide';
import MaskLayer from '../../../component/mask-layer';

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
	},

	events: {
		selectPerformeInfoNav: function (id) {

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
				{
					this.props.isShowMaskLayer ?
						<MaskLayer
							hideMaskLayer={this.props.hideMaskLayer}
							isSelectPerformeInfoNavId={this.props.isSelectPerformeInfoNavId}
							performer={this.props.performer}
							maskLayerControl={this.props.maskLayerControl}
							isMaskLayerPlay={this.props.isMaskLayerPlay}

							maskLayerInitSlide={this.props.maskLayerInitSlide}
							maskLayerLeft={this.props.maskLayerLeft}
							maskLayerRight={this.props.maskLayerRight}
							touchMove={this.props.touchMove}
							touchEnd={this.props.touchEnd}
							touchStart={this.props.touchStart}
							imgId={this.props.imgId}
							selectArticle={this.props.selectArticle}
						/> : null
				}

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
								{ performer.briefIntroduction }
							</div>
						</div>
					</div>

					<div className="bottom-info">
						<div className="teleplay-works">
							<div className="teleplay-works-scrollbar bottom-info-scrollbar">
								<div className="handle"></div>
							</div>
							<div className="teleplay-works-scrollbar-content" id="teleplay-works-scrollbar-content">
								<div dangerouslySetInnerHTML={{__html : performer.teleplayWorks }}>
								</div>
							</div>

						</div>
						<div className="honour-record">
							<div className="honour-record-scrollbar bottom-info-scrollbar">
								<div className="handle"></div>
							</div>
							<div className="honour-record-scrollbar-content" id="honour-record-scrollbar-content">
								<div dangerouslySetInnerHTML={{__html : performer.honourRecord }}>
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
									<div
										onClick={_this.events.selectPerformeInfoNav.bind(_this, performeInfoNav.id)}
										className={topArrowCls} key={index} data-id={performeInfoNav.id}>
										<div className="nav-li-title">{performeInfoNav.name}</div>
									</div>
								)
							})
						}

					</div>
					<SlideCompent
						Slide={Slide}
						performer={this.props.performer}
						showMaskLayer={this.props.showMaskLayer}
						isSelectPerformeInfoNavId={this.props.isSelectPerformeInfoNavId}
					/>
				</div>
				<div className="foter-content">
					<div className="back-off" onClick={this.props.backOff.bind(this,"performerList")}></div>
				</div>
			</div>
		);
	}
});
module.exports = PerformerInfo;