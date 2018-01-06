/**
 * Created by fengs on 2017/9/13.
 */
require('../style/performer-info.scss');
import classNames from 'classnames';
import SlideCompent from './slide';
import MaskLayer from '../../../component/mask-layer';
var frame = "", frame1 = "";
var PerformerInfo = React.createClass({
	initSly: function () {
		frame ? frame.destroy(true) : frame = "";
		frame1 ? frame1.destroy(true) : frame1 = "";
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

	componentDidMount: function () {
		if (this.props.isPerformerInfoLoadingImg) {
			this.props.preLoadImg("performerInfo");
		}
		this.initSly();
	},
	componentWillMount: function () {
		this.props.getPerformerInfo(this.props.performerID);
	},
	events: {
		selectPerformeInfoNav: function (id) {
			this.props.selectPerformeInfoNav(id);
		}
	},

	render(){

		var performer = this.props.performer;
		var _this = this;
		var performerSlyCls = classNames({
			'top-content': true,
			'top-content-open': this.props.isPerformerInfoDropDown,
			'top-content-open-showBg': this.props.isPerformerInfoDropDownShowBg
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
							clickedIndex={this.props.clickedIndex}
							selectArticle={this.props.selectArticle}
							nextContent={this.props.nextContent}
							previewContent={this.props.previewContent}
							changePreview={this.props.changePreview}
							onThumbnailsClick={this.props.onThumbnailsClick}
						/> : null
				}

				<div className={topArrowCls} style={{"top":this.props.touchTop}}
					 onClick={this.props.performerInfoDropDown.bind(this,"id")}
					 onTouchStart={this.props.touchStart.bind(_this)}
					 onTouchMove={this.props.touchMove.bind(_this)}
					 onTouchEnd={this.props.touchEnd.bind(_this)}
				>
					<div className="arrow"></div>
				</div>
				<div className={performerSlyCls} style={{"height":this.props.touchHeight}}>
					<div className="top-info">
						<div className="left-content">
							<div className="actor-name">{performer.ActorName}</div>
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
							<div className="personalized-signature"
								 dangerouslySetInnerHTML={{__html : performer.personalizedSignature }}>
							</div>

							<div className="brief-introduction"
								 dangerouslySetInnerHTML={{__html : performer.briefIntroduction }}>
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
									'nav-li-select': performeInfoNav.isSelect,
									'isShow': performeInfoNav.isShow
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
						performer={this.props.performer}
						showMaskLayer={this.props.showMaskLayer}
						isSelectPerformeInfoNavId={this.props.isSelectPerformeInfoNavId}
					/>
				</div>
				<div className="foter-content">
					<div className="back-off trans" onClick={this.props.backOff.bind(this,"performerList")}></div>
					<div className="back-off trans arrow-1" onClick={this.props.backOff.bind(this,"performerList")}></div>
				</div>
			</div>
		);
	}
});
module.exports = PerformerInfo;