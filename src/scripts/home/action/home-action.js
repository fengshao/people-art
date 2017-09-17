/**
 * Created by fengs on 2016/9/16.
 */
var PublicAjax = require("../../../ajax/public-ajax-local");

function HomeAction() {

	this.generateActions(
		'getPerformerList',//进入演员列表页面 并 获取演员列表
		'backOff',//返回上一页
		'performerInfoDropDown', //展开演员信息
		'selectPerformeInfoNav',//切换演员 信息列表 （他院作品 影视作品）
		'openPerformerInfo',//进入演员信息页
		'getHomePageData',//获取首页信息
		'getClassicRepertoireList',//进入经典曲目页面 经典剧目列表
		'getLetterArr',//获取演员姓氏列表
		'playVideo',
		'onPlay',
		'onPause',
		'playVideoPerformer',
		'showMaskLayer',
		'hideMaskLayer',
		'maskLayerControl',

		'maskLayerInitSlide',
		'maskLayerK_touch',
		'maskLayerLeft',
		'maskLayerRight',
		'touchStart',
		'touchEnd',
		'touchMove',
		'selectArticle',
		'selectLetter',
		'loopVideo'
	);

	this.getHomePageData = function () {
		var _this = this;
		PublicAjax.getHomePageData().then(function (homePageData) {
			_this.dispatch(homePageData);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.getClassicRepertoireList = function () {
		var _this = this;
		PublicAjax.getClassicRepertoireList().then(function (classicRepertoireList) {
			_this.dispatch(classicRepertoireList);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.getLetterArr = function () {
		var _this = this;
		PublicAjax.getLetterArr().then(function (letterArr) {
			_this.dispatch(letterArr);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.getPerformerList = function () {
		var _this = this;

		$.when(PublicAjax.getPerformerList(), PublicAjax.getClassicRepertoireList(), PublicAjax.getLetterArr()).then(function (performerList, classicRepertoireList, letterArr) {
			_this.dispatch({
				performerList: performerList,
				letterArr: letterArr,
				classicRepertoireList: classicRepertoireList
			});
		});
	};


	this.openClassicRepertoire = function () {
		this.dispatch();
	};

	this.backOff = function (type) {
		this.dispatch(type);
	};

	this.openPerformerInfo = function (id) {
		this.dispatch(id);
	};

	this.selectPerformeInfoNav = function (id) {
		this.dispatch(id);
	};

}
module.exports = alt.createActions(HomeAction);