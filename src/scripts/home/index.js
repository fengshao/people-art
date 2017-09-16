/**
 * Created by fengs on 2017/9/9.
 *
 */
require("../../component/scrollbar/sly.js");

import HomePage from './view/home';
import ClassicRepertoire from './view/classicRepertoire';
import PerformerList from './view/performer-list';
import PerformerInfo from './view/performer-info';

var HomeStore = require("./store/home-store");
var HomeAction = require("./action/home-action");
var Home = React.createClass({
	getInitialState: function () {
		var data = HomeStore.getState();
		return data;
	},

	onChange: function () {
		var data = HomeStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		HomeStore.listen(this.onChange);
		HomeAction.getHomePageData();
	},

	componentWillUnmount: function () {
		HomeStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {

		maskLayerInitSlide: function (imgId) {
			HomeAction.maskLayerInitSlide(imgId);
		},

		maskLayerLeft: function (type) {
			HomeAction.maskLayerLeft(type);
		},

		maskLayerRight: function (type) {
			HomeAction.maskLayerRight(type);
		},

		getClassicRepertoireList: function () {
			HomeAction.getClassicRepertoireList();
		},

		getPerformerList: function () {
			HomeAction.getPerformerList();
		},

		backOff: function (type) {
			HomeAction.backOff(type);
		},

		performerInfoDropDown: function () {
			HomeAction.performerInfoDropDown();
		},

		openPerformerInfo: function (id) {
			HomeAction.openPerformerInfo(id);
		},

		selectPerformeInfoNav: function (id) {
			HomeAction.selectPerformeInfoNav(id);
		},

		playVideoPerformer: function (performer) {
			HomeAction.playVideoPerformer(performer);
		},

		playVideo: function () {
			HomeAction.playVideo();
		},

		onPause: function () {
			HomeAction.onPause();
		},

		onPlay: function () {
			HomeAction.onPlay();
		},

		showMaskLayer: function (imgId) {
			HomeAction.showMaskLayer(imgId);
		},

		hideMaskLayer: function () {
			HomeAction.hideMaskLayer();
		},

		maskLayerControl: function (id) {
			HomeAction.maskLayerControl(id);
		},

		touchStart: function (e) {
			HomeAction.touchStart(e);
		},

		touchEnd: function (type) {
			HomeAction.touchEnd(type);
		},

		touchMove: function (e) {
			HomeAction.touchMove(e);
		},

		selectArticle: function (index, id) {
			HomeAction.selectArticle({
				"index": index,
				"id": id
			});
		}
	},

	render: function () {
		return (
			<div className="main-content">
				{
					this.state.isOpenHomePage ?
						<HomePage
							getClassicRepertoireList={this.events.getClassicRepertoireList}
							getPerformerList={this.events.getPerformerList}
							homePageData={this.state.homePageData}
						/> : null
				}
				{
					this.state.isOpenClassicRepertoire ?
						<ClassicRepertoire
							backOff={this.events.backOff}
							playVideoPerformer={this.events.playVideoPerformer}
							playVideo={this.events.playVideo}
							onPause={this.events.onPause}
							onPlay={this.events.onPlay}
							classicRepertoireList={this.state.classicRepertoireList}
							classicRepertoire={this.state.classicRepertoire}
							isShowSuspend={this.state.isShowSuspend}
						/> : null
				}
				{
					this.state.isOpenPerformerList ?
						<PerformerList
							letterArr={this.state.letterArr}
							performerList={this.state.performerList}
							isShowLeterStr={this.state.isShowLeterStr}
							isShowPerformerList={this.state.isShowPerformerList}
							classicRepertoireList={this.state.classicRepertoireList}
							openPerformerInfo={this.events.openPerformerInfo}
						/> : null
				}
				{
					this.state.isOpenPerformerInfo ?
						<PerformerInfo

							maskLayerInitSlide={this.events.maskLayerInitSlide}
							maskLayerLeft={this.events.maskLayerLeft}
							maskLayerRight={this.events.maskLayerRight}
							touchMove={this.events.touchMove}
							touchEnd={this.events.touchEnd}
							touchStart={this.events.touchStart}
							selectArticle={this.events.selectArticle}

							backOff={this.events.backOff}
							showMaskLayer={this.events.showMaskLayer}
							hideMaskLayer={this.events.hideMaskLayer}
							maskLayerControl={this.events.maskLayerControl}
							performerInfoDropDown={this.events.performerInfoDropDown}
							selectPerformeInfoNav={this.events.selectPerformeInfoNav}
							isPerformerInfoDropDown={this.state.isPerformerInfoDropDown}
							performer={this.state.performer}
							performeInfoNavList={this.state.performeInfoNavList}
							isSelectPerformeInfoNavId={this.state.isSelectPerformeInfoNavId}
							isShowMaskLayer={this.state.isShowMaskLayer}
							isMaskLayerPlay={this.state.isMaskLayerPlay}
							imgId={this.state.imgId}
						/> : null
				}
				{
					this.state.isOpenTest ?
						<Test
							imgDatas={this.state.imgDatas}
						/> : null
				}
			</div>
		);
	}
});
export default Home;