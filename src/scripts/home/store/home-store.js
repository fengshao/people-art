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
	this.isShowSuspend = true;
	this.isMaskLayerPlay = false;
//this.letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].reverse();
	this.performerList = [];
	this.isShowPerformerList = [];
	this.performer = {};
	this.letterArr = [];
	this.classicRepertoireList = [];
	this.classicRepertoire = {};
	this.isShowLeterStr = "";
	this.slideNub2 = 0;
	this.slideNub1 = 0;
	this._start = 0;
	this._end = 0;

	this.$element1 = ".top-slide-contnet";
	this.$element2 = ".bottom-slide-contnet";

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
	this.performerList = obj.performerList;
	this.letterArr = obj.letterArr;
	this.classicRepertoireList = obj.classicRepertoireList;
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerInfo = false;
	this.isOpenHomePage = false;
	this.isOpenPerformerList = true;
	this.isShowLeterStr = obj.letterArr[0];
	obj.performerList.map(function (performer, index) {
		if (performer.surname.toLowerCase() == obj.letterArr[0].toLowerCase()) {
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

HomeStore.prototype.showMaskLayer = function () {
	this.isShowMaskLayer = true;
};

HomeStore.prototype.hideMaskLayer = function () {
	this.isShowMaskLayer = false;
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


HomeStore.prototype.initChangeDom = function (slideNub, $element) {
	for (let i = 0; i < slideNub; i++) {
		$($element).find(".slide .img:eq(" + i + ")").attr("data-slide-imgId", i);
	}

//根据轮播图片数量设定图片位置对应的class
	if (slideNub == 1) {
		for (let i = 0; i < slideNub; i++) {
			$($element).find(".slide .img:eq(" + i + ")").addClass("img3");
		}
	}
	if (slideNub == 2) {
		for (let i = 0; i < slideNub; i++) {
			$($element).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 3));
		}
	}
	if (slideNub == 3) {
		for (let i = 0; i < slideNub; i++) {
			$($element).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 2));
		}
	}
	if (slideNub > 3 && slideNub < 6) {
		for (let i = 0; i < slideNub; i++) {
			$($element).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
		}
	}
	if (slideNub >= 6) {
		for (let i = 0; i < slideNub; i++) {
			if (i < 5) {
				$($element).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
			} else {
				$($element).find(".slide .img:eq(" + i + ")").addClass("img6");
			}
		}
	}
};

HomeStore.prototype.maskLayerInitSlide = function () {
	this.slideNub1 = $(this.$element1).find(".slide .img").size();             //获取轮播图片数量
	this.slideNub2 = $(this.$element2).find(".slide .img").size();             //获取轮播图片数量
	this.initChangeDom(this.slideNub1, this.$element1);
	this.initChangeDom(this.slideNub2, this.$element2);
};

HomeStore.prototype.maskLayerLeftFnc = function (slideNub, $element) {
	var fy = new Array();
	for (let i = 0; i < slideNub; i++) {
		fy[i] = $($element).find(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (let i = 0; i < slideNub; i++) {
		if (i == (slideNub - 1)) {
			$($element).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[0]);
		} else {
			$($element).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i + 1]);
		}
	}
};

HomeStore.prototype.maskLayerLeft = function () {
	this.isMaskLayerPlay = false;
	for (let i = 0; i < $(".media-video").length; i++) {
		$(".media-video")[i].pause();
	}

	this.maskLayerLeftFnc(this.slideNub1, this.$element1);
	this.maskLayerLeftFnc(this.slideNub2, this.$element2);
};

HomeStore.prototype.maskLayerRightFnc = function (slideNub, $element) {
	var fy = new Array();
	for (let i = 0; i < slideNub; i++) {
		fy[i] = $($element).find(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (let i = 0; i < slideNub; i++) {
		if (i == 0) {
			$($element).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[slideNub - 1]);
		} else {
			$($element).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i - 1]);
		}
	}
};

HomeStore.prototype.maskLayerRight = function () {

	this.isMaskLayerPlay = false;
	for (let i = 0; i < $(".media-video").length; i++) {
		$(".media-video")[i].pause();
	}

	this.maskLayerRightFnc(this.slideNub1, this.$element1);
	this.maskLayerRightFnc(this.slideNub2, this.$element2);

};
HomeStore.prototype.touchStart = function (event) {
	var touch = event.targetTouches[0];
	this._start = touch.pageX;
};

HomeStore.prototype.touchMove = function (event) {
	var touch = event.targetTouches[0];
	this._end = (this._start - touch.pageX);
};

HomeStore.prototype.touchEnd = function (event) {
	if (this._end < -100) {
		this.maskLayerLeft();
		this._end = 0;
	} else if (this._end > 100) {
		this.maskLayerRight();
		this._end = 0;
	}
};

module.exports = alt.createStore(HomeStore, 'HomeStore');