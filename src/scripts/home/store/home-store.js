/**
 * Created by fengs on 2016/9/16.
 */
var HomeAction = require("../action/home-action");

function HomeStore() {
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = true;
	this.isOpenPerformerInfo = false;
	this.isOpenTest = false;
	this.isPerformerInfoDropDown = false;
	//this.letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].reverse();
	this.performerList = [];
	this.isShowPerformerList = [];
	this.performer = {};
	this.letterArr = [];
	this.classicRepertoireList = [];
	this.classicRepertoire = [];
	this.homePageData = {
		"id": "",
		"time": "",
		"img": []
	};
	this.isSelectPerformeInfoNavId = "1";
	this.performeInfoNavList = [
		{"id": "1", "name": "话剧作品", "isSelect": true},
		{"id": "2", "name": "他院作品", "isSelect": false},
		{"id": "3", "name": "影视作品", "isSelect": false},
		{"id": "4", "name": "发表文章", "isSelect": false}
	];

	this.bindActions(HomeAction);
}


//获取首页数据
HomeStore.prototype.getHomePageData = function (homePageData) {
	this.homePageData = homePageData;
};

//获取经典剧目列表
HomeStore.prototype.getClassicRepertoireList = function (classicRepertoireList) {
	this.classicRepertoireList = classicRepertoireList;
	this.isOpenClassicRepertoire = true;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = false;
};

//获取演员姓氏列表
HomeStore.prototype.getLetterArr = function (letterArr) {
	this.homePageData = letterArr;
};

//获取演员列表
HomeStore.prototype.getPerformerList = function (obj) {

	this.performerList = obj.performerList;
	this.letterArr = obj.letterArr;
	this.classicRepertoireList = obj.classicRepertoireList;
	this.isShowPerformerList = obj.performerList[0];
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerInfo = false;
	this.isOpenHomePage = false;
	this.isOpenPerformerList = true;
};


//进入演员信息页
HomeStore.prototype.openPerformerInfo = function (id) {
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = false;
	this.isOpenPerformerInfo = true;

	this.performer = this.performerList.map(function (performer, index) {
		if (performer.id == id) {
			return performer;
		}
	})


};


//回到上一页
HomeStore.prototype.backOff = function (type) {
	switch (type) {
		case "homePage":
			this.isOpenClassicRepertoire = false;
			this.isOpenPerformerList = false;
			this.isOpenPerformerInfo = false;
			this.isOpenHomePage = true;
			break;
		case "performerList":
			this.isOpenClassicRepertoire = false;
			this.isOpenHomePage = false;
			this.isOpenPerformerInfo = false;
			this.isOpenPerformerList = true;
			break;
	}
};

//是否展开演员信息
HomeStore.prototype.performerInfoDropDown = function () {
	if (this.isPerformerInfoDropDown) {
		this.isPerformerInfoDropDown = false;
	} else {
		this.isPerformerInfoDropDown = true;
	}
};

//切换演员作品列表
HomeStore.prototype.selectPerformeInfoNav = function (id) {
	var _this = this;
	this.performeInfoNavList.map(function (performeInfoNav, index) {

		if (performeInfoNav.id == id) {
			performeInfoNav.isSelect = true;
			_this.isSelectPerformeInfoNavId = performeInfoNav.id;
		} else {
			performeInfoNav.isSelect = false;
		}

	});
};


module.exports = alt.createStore(HomeStore, 'HomeStore');