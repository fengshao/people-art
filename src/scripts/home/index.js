/**
 * Created by fengs on 2017/9/9.
 *
 */
require('./style/main.scss');
require("../../component/scrollbar/sly.js");

import HomePage from './view/home';
import ClassicRepertoire from './view/classicRepertoire';
import PerformerList from './view/performer-list';
import PerformerInfo from './view/performer-info';
// import Test from './test/test.js';

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
							backOff={this.events.backOff}
							performerInfoDropDown={this.events.performerInfoDropDown}
							selectPerformeInfoNav={this.events.selectPerformeInfoNav}
							isPerformerInfoDropDown={this.state.isPerformerInfoDropDown}
							performer={this.state.performer}
							performeInfoNavList={this.state.performeInfoNavList}
							isSelectPerformeInfoNavId={this.state.isSelectPerformeInfoNavId}
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