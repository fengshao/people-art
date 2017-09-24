/**
 * Created by fengs on 2016/9/16.
 */
var HomeAction = require("../action/home-action");
import Slide from '../../../component/slide';

function HomeStore() {
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = true;
	this.isOpenPerformerInfo = false;
	this.isOpenTest = false;
	this.isPerformerInfoDropDown = false;
	this.isPerformerInfoDropDownShowBg = false;
	this.isShowSuspend = true;
	this.isMaskLayerPlay = false;
//this.letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].reverse();
	this.performerList = [];
	this.isShowPerformerList = [];
	this.performer = {};
	this.letterArr = [];
	this.classicRepertoireList = [];
	this.classicRepertoire = {};
	this.loopVideoArr = [];
	this.isShowLeterStr = "";
	this.slideNub2 = 0;
	this.slideNub1 = 0;
	this._start = 0;
	this._end = 0;
	this.swiper = "";
	this.touchHeight = 891;
	this.touchTop = 877;
	this.imgId = 0;

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
	if (classicRepertoireList.length > 0) {
		this.classicRepertoire = _.extend(this.classicRepertoire, classicRepertoireList[0]);
	}

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
	var _this = this;
	_this.isShowPerformerList = [];
	this.performerList = obj.performerList;
	this.letterArr = obj.letterArr;
	this.classicRepertoireList = obj.classicRepertoireList;
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerInfo = false;
	this.isOpenHomePage = false;
	this.isOpenPerformerList = true;
	this.isShowLeterStr = obj.letterArr[0];
	this.letterArr[0].isSelect = true;
	obj.performerList.map(function (performer, index) {
		if (performer.surname == obj.letterArr[0].id) {
			_this.isShowPerformerList.push(performer)
		}
	});
	var loopVideoArr = [];
	var videoRegular = /\.(mp4|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb)$/i;

	obj.classicRepertoireList.map(function (classicRepertoire, index) {
		if (classicRepertoire.video && videoRegular.test(classicRepertoire.video)) {
			loopVideoArr.push(classicRepertoire);
		}
	});
	this.loopVideoArr = loopVideoArr;

};

//根据选中字母展示演员列表
HomeStore.prototype.selectLetter = function (letterID) {
	var _this = this;
	_this.isShowPerformerList = [];
	this.letterArr.map(function (letter, index) {
		if (letterID == letter.id) {
			letter.isSelect = true;
			_this.isShowLeterStr = letter;
		} else {
			letter.isSelect = false;
		}
	});

	this.performerList.map(function (performer, index) {
		if (performer.surname == letterID) {
			_this.isShowPerformerList.push(performer)
		}
	});

};


//进入演员信息页
HomeStore.prototype.openPerformerInfo = function (id) {
	var _this = this;
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = false;
	this.isOpenPerformerInfo = true;

	this.performerList.map(function (performer, index) {
		if (performer.id == id) {
			_this.performer = performer;
		}
	})


};


//回到上一页
HomeStore.prototype.backOff = function (type) {
	var _this = this;
	switch (type) {
		case "homePage":
			this.isOpenClassicRepertoire = false;
			this.isOpenPerformerList = false;
			this.isOpenPerformerInfo = false;
			this.isOpenHomePage = true;
			this.isMaskLayerPlay = false;

			break;
		case "performerList":
			this.isOpenClassicRepertoire = false;
			this.isOpenHomePage = false;
			this.isOpenPerformerInfo = false;
			this.isOpenPerformerList = true;
			this.touchHeight = 891;
			this.touchTop = 877;
			this.isPerformerInfoDropDownShowBg = false;
			this.isPerformerInfoDropDown = false;
			this.isMaskLayerPlay = false;

			this.performeInfoNavList.map(function (performeInfoNav, index) {
				if (index == 0) {
					performeInfoNav.isSelect = true;
					_this.isSelectPerformeInfoNavId = performeInfoNav.id;
				} else {
					performeInfoNav.isSelect = false;
				}
			});

			break;
	}
};

//是否展开演员信息
HomeStore.prototype.performerInfoDropDown = function () {
	if (this.isPerformerInfoDropDown) {
		this.isPerformerInfoDropDown = false;
		this.isPerformerInfoDropDownShowBg = false;
		this.touchHeight = 891;
		this.touchTop = 877;
	} else {
		this.isPerformerInfoDropDown = true;
		this.isPerformerInfoDropDownShowBg = true;
		this.touchHeight = 1769;
		this.touchTop = 1760;
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

HomeStore.prototype.playVideo = function () {
	if (this.isShowSuspend) {
		this.isShowSuspend = false;
		$("#media")[0].play();
	} else {
		this.isShowSuspend = true;
		$("#media")[0].pause();
	}
};

HomeStore.prototype.playVideoPerformer = function (performer) {
	this.classicRepertoire = performer;
	this.isShowSuspend = true;
};
HomeStore.prototype.onPlay = function () {
	this.isShowSuspend = false;
};

HomeStore.prototype.onPause = function () {
	this.isShowSuspend = true;
};

HomeStore.prototype.showMaskLayer = function (imgId) {
	this.isShowMaskLayer = true;
	this.imgId = imgId;
};

HomeStore.prototype.hideMaskLayer = function () {
	this.isShowMaskLayer = false;
	this.isMaskLayerPlay = false;
	this.imgId = 0;
	this.performer.articleList.map(function (article, index) {
		article.isSelect = false;
	});
};

HomeStore.prototype.maskLayerControl = function (id) {
	if (this.isMaskLayerPlay) {
		this.isMaskLayerPlay = false;
		$("#" + id + " .media-video")[0].pause();
	} else {
		this.isMaskLayerPlay = true;
		$("#" + id + " .media-video")[0].play();
	}
};


HomeStore.prototype.loopVideo = function (obj) {
	var vList = this.loopVideoArr; // 初始化播放列表 var
	var vLen = vList.length; // 播放列表的长度
	var curr = 1; // 当前播放的视频
	var video = document.getElementById("loop-video-media");
	video.addEventListener('ended', play);
	// play();
	function play() {
		var video = document.getElementById("loop-video-media");
		video.src = vList[curr].video;
		video.poster = vList[curr].preview;
		video.load(); //如果短的话，可以加载完成之后再播放，监听 canplaythrough 事件即可
		video.play();
		curr++;
		if (curr >= vLen) {
			curr = 0; // 播放完了，重新播放
		}
	}
};

HomeStore.prototype.selectArticle = function (id) {
	this.performer.articleList.map(function (article, index) {
		if (article.id == id) {
			article.isSelect = true;
		} else {
			article.isSelect = false;
		}
	})
};

HomeStore.prototype.touchStart = function (event) {
	var touch = event.targetTouches[0];
	this._start = touch.pageY;
};

//高度要增高 878  箭头 top 要增加883
HomeStore.prototype.touchMove = function (event) {
	var touch = event.targetTouches[0];
	this._end = (this._start - touch.pageY);

	console.log("this._end:" + this._end);

	//上移 为正  下移为负
	if (this.isPerformerInfoDropDown) {
		//	打开状态 上移 高度变低
		if (this._end > 878) {
			return
		}
		if (this.touchHeight >= 1769 && this._end < 0) {
			return
		}

		this.touchHeight = 1769 - this._end;
		this.touchTop = 1760 - this._end;
	} else {
		if (-this._end > 878) {
			return
		}

		if (this.touchHeight <= 891 && this._end > 0) {
			return
		}
		this.isPerformerInfoDropDownShowBg = true;

		this.touchHeight = 891 - this._end;
		this.touchTop = 877 - this._end;
	}

};

HomeStore.prototype.touchEnd = function (type) {
	if (this._end < 0) {
		if (-439 < this._end && this._end < 0) {
			this.touchHeight = 891;
			this.touchTop = 877;
			this.isPerformerInfoDropDown = false;
			this.isPerformerInfoDropDownShowBg = false;
		} else {
			this.touchHeight = 1769;
			this.touchTop = 1760;
			this.isPerformerInfoDropDown = true;
			this.isPerformerInfoDropDownShowBg = true;
		}
		this._end = 0;

	} else if (this._end > 0) {
		if (0 < this._end && this._end < 439) {
			this.touchHeight = 1769;
			this.touchTop = 1760;
			this.isPerformerInfoDropDown = true;
			this.isPerformerInfoDropDownShowBg = true;
		} else {
			this.touchHeight = 891;
			this.touchTop = 877;
			this.isPerformerInfoDropDown = false;
			this.isPerformerInfoDropDownShowBg = false;
		}
		this._end = 0;

	}
};

module.exports = alt.createStore(HomeStore, 'HomeStore');