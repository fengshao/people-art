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
	this.slideNub = 0;
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
	console.log("maskLayerControl", this.isMaskLayerPlay);

};


/**
 * Created by fengshao on 2017/9/8.
 */
HomeStore.prototype.maskLayerInitSlide = function ($element) {
	this.slideNub = $(this.$element1).find(".slide .img").size();             //获取轮播图片数量
	for (let i = 0; i < this.slideNub; i++) {
		$(this.$element2).find(".slide .img:eq(" + i + ")").attr("data-slide-imgId", i);
		$(this.$element1).find(".slide .img:eq(" + i + ")").attr("data-slide-imgId", i);
	}

//根据轮播图片数量设定图片位置对应的class
	if (this.slideNub == 1) {
		for (let i = 0; i < this.slideNub; i++) {
			$(this.$element2).find(".slide .img:eq(" + i + ")").addClass("img3");
			$(this.$element1).find(".slide .img:eq(" + i + ")").addClass("img3");
		}
	}
	if (this.slideNub == 2) {
		for (let i = 0; i < this.slideNub; i++) {
			$(this.$element2).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 3));
			$(this.$element1).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 3));
		}
	}
	if (this.slideNub == 3) {
		for (let i = 0; i < this.slideNub; i++) {
			$(this.$element2).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 2));
			$(this.$element1).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 2));
		}
	}
	if (this.slideNub > 3 && this.slideNub < 6) {
		for (let i = 0; i < this.slideNub; i++) {
			$(this.$element2).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
			$(this.$element1).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
		}
	}
	if (this.slideNub >= 6) {
		for (let i = 0; i < this.slideNub; i++) {
			if (i < 5) {
				$(this.$element2).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
				$(this.$element1).find(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
			} else {
				$(this.$element2).find(".slide .img:eq(" + i + ")").addClass("img6");
				$(this.$element1).find(".slide .img:eq(" + i + ")").addClass("img6");
			}
		}
	}
	// this.imgClickFy($element2);
};

HomeStore.prototype.maskLayerK_touch = function ($element) {
	var _this = this;
	var _start = 0, _end = 0, _content = $element2.find("#slide")[0];
	_content.addEventListener("touchstart", touchStart, false);
	_content.addEventListener("touchmove", touchMove, false);
	_content.addEventListener("touchend", touchEnd, false);

	var _start1 = 0, _end1 = 0, _content1 = $(this.$element1).find("#slide")[0];
	_content1.addEventListener("touchstart", touchStart1, false);
	_content1.addEventListener("touchmove", touchMove1, false);
	_content1.addEventListener("touchend", touchEnd1, false);

	function touchStart(event) {
		var touch = event.targetTouches[0];
		_start = touch.pageX;
	}

	function touchMove(event) {
		var touch = event.targetTouches[0];
		_end = (_start - touch.pageX);
	}

	function touchEnd(event) {
		if (_end < -100) {
			_this.maskLayerLeft();
			_end = 0;
		} else if (_end > 100) {
			_this.maskLayerRight();
			_end = 0;
		}
	}

	function touchStart1(event) {
		var touch = event.targetTouches[0];
		_start1 = touch.pageX;
	}

	function touchMove1(event) {
		var touch = event.targetTouches[0];
		_end1 = (_start1 - touch.pageX);
	}

	function touchEnd1(event) {
		if (_end1 < -100) {
			_this.maskLayerLeft();
			_end1 = 0;
		} else if (_end1 > 100) {
			_this.maskLayerRight();
			_end1 = 0;
		}
	}

};

HomeStore.prototype.maskLayerLeft = function ($element) {
	var fy = new Array();
	var fy1 = new Array();
	console.log("maskLayerLeft1", this.isMaskLayerPlay);
	this.isMaskLayerPlay = false;
	console.log("maskLayerLeft2", this.isMaskLayerPlay);
	for (let i = 0; i < $(".media-video").length; i++) {
		$(".media-video")[i].pause();
	}

	for (let i = 0; i < this.slideNub; i++) {
		fy[i] = $(this.$element2).find(".slide .img[data-slide-imgId=" + i + "]").attr("class");
		fy1[i] = $(this.$element1).find(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (let i = 0; i < this.slideNub; i++) {
		if (i == (this.slideNub - 1)) {
			$(this.$element2).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[0]);
			$(this.$element1).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy1[0]);
		} else {
			$(this.$element2).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i + 1]);
			$(this.$element1).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy1[i + 1]);
		}
	}
	// this.imgClickFy();
};

HomeStore.prototype.maskLayerRight = function ($element) {
	var fy = new Array();
	var fy1 = new Array();
	console.log("maskLayerRight1", this.isMaskLayerPlay);

	this.isMaskLayerPlay = false;
	console.log("maskLayerRight2", this.isMaskLayerPlay);
	for (let i = 0; i < $(".media-video").length; i++) {
		$(".media-video")[i].pause();
	}
	for (let i = 0; i < this.slideNub; i++) {
		fy[i] = $(this.$element2).find(".slide .img[data-slide-imgId=" + i + "]").attr("class");
		fy1[i] = $(this.$element1).find(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (let i = 0; i < this.slideNub; i++) {
		if (i == 0) {
			$(this.$element2).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[this.slideNub - 1]);
			$(this.$element1).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy1[this.slideNub - 1]);
		} else {
			$(this.$element2).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i - 1]);
			$(this.$element1).find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy1[i - 1]);
		}
	}
};
HomeStore.prototype.touchStart = function (event) {
	var touch = event.targetTouches[0];
	this._start = touch.pageX;
}

HomeStore.prototype.touchMove = function (event) {
	var touch = event.targetTouches[0];
	this._end = (this._start - touch.pageX);
}

HomeStore.prototype.touchEnd = function (event) {
	if (this._end < -100) {
		this.maskLayerLeft();
		this._end = 0;
	} else if (this._end > 100) {
		this.maskLayerRight();
		this._end = 0;
	}
}

module.exports = alt.createStore(HomeStore, 'HomeStore');