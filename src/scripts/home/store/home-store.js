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

	this.imgId = 0;

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
	this.letterArr[0].isSelect = true;
	obj.performerList.map(function (performer, index) {
		if (performer.surname == obj.letterArr[0].id) {
			_this.isShowPerformerList.push(performer)
		}
	});

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
			break;
		case "performerList":
			this.isOpenClassicRepertoire = false;
			this.isOpenHomePage = false;
			this.isOpenPerformerInfo = false;
			this.isOpenPerformerList = true;

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

HomeStore.prototype.showMaskLayer = function (imgId) {
	this.isShowMaskLayer = true;
	this.imgId = imgId;
	if (this.performer.articleList.length == 1) {
		this.performer.articleList[0].isSelect = true;
	}
	if (this.performer.articleList.length == 2) {
		this.performer.articleList[0].isSelect = true;
	}
	if (this.performer.articleList.length == 3) {
		this.performer.articleList[1].isSelect = true;
	}
	if (this.performer.articleList.length > 3) {
		this.performer.articleList[2].isSelect = true;
	}
};

HomeStore.prototype.hideMaskLayer = function () {
	this.isShowMaskLayer = false;
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


HomeStore.prototype.initChangeDom = function (slideNub, $element, imgId) {
	for (let i = 0; i < slideNub; i++) {
		$($element).find(".slide .img:eq(" + i + ")").attr("data-slide-imgId", i);
	}
	// var imgId = parseInt(imgId);
	//
	// $($element).find(".slide .img:eq(" + imgId + ")").addClass("img3");
	//
	// if (imgId == 0) {
	//
	// 	if (slideNub == 2) {
	// 		$($element).find(".slide .img:eq(" + (imgId + 1) + ")").addClass("img4");
	// 	}
	// 	if (slideNub == 3) {
	// 		$($element).find(".slide .img:eq(" + (imgId + 1) + ")").addClass("img4");
	// 		$($element).find(".slide .img:eq(" + (imgId + 2) + ")").addClass("img2");
	// 	}
	//
	// 	if (slideNub == 4) {
	// 		$($element).find(".slide .img:eq(" + (imgId + 1) + ")").addClass("img4");
	// 		$($element).find(".slide .img:eq(" + (imgId + 2) + ")").addClass("img5");
	// 		$($element).find(".slide .img:eq(" + (imgId + 3) + ")").addClass("img2");
	// 	}
	//
	// 	if (slideNub == 5) {
	// 		$($element).find(".slide .img:eq(" + (imgId + 1) + ")").addClass("img4");
	// 		$($element).find(".slide .img:eq(" + (imgId + 2) + ")").addClass("img5");
	// 		$($element).find(".slide .img:eq(" + (imgId + 3) + ")").addClass("img2");
	// 		$($element).find(".slide .img:eq(" + (imgId + 4) + ")").addClass("img1");
	// 	}
	//
	// 	for (let i = (imgId + 1); i < slideNub; i++) {
	// 		if (i == imgId + 1) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img4");
	// 		} else if (i == imgId + 2) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img5");
	// 		} else if (i == slideNub - 1) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img2");
	// 		} else if (i == slideNub - 2) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img1");
	// 		} else {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img6");
	// 		}
	// 	}
	// }
	// if (imgId == 1) {
	// 	if (slideNub == 2) {
	// 		$($element).find(".slide .img:eq(" + (imgId - 1) + ")").addClass("img4");
	// 	}
	// 	if (slideNub == 3) {
	// 		$($element).find(".slide .img:eq(" + (imgId + 1) + ")").addClass("img4");
	// 		$($element).find(".slide .img:eq(" + (imgId - 1) + ")").addClass("img2");
	// 	}
	//
	// 	if (slideNub == 4) {
	// 		$($element).find(".slide .img:eq(" + (imgId - 1) + ")").addClass("img2");
	// 		$($element).find(".slide .img:eq(" + (imgId + 1) + ")").addClass("img4");
	// 		$($element).find(".slide .img:eq(" + (imgId + 2) + ")").addClass("img5");
	// 	}
	//
	// 	if (slideNub == 5) {
	// 		$($element).find(".slide .img:eq(" + (imgId - 1) + ")").addClass("img2");
	// 		$($element).find(".slide .img:eq(" + (imgId - 2) + ")").addClass("img1");
	// 		$($element).find(".slide .img:eq(" + (imgId + 1) + ")").addClass("img4");
	// 		$($element).find(".slide .img:eq(" + (imgId + 2) + ")").addClass("img5");
	// 	}
	//
	// 	for (let i = (imgId + 1); i < slideNub; i++) {
	// 		if (i == imgId + 1) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img4");
	// 		} else if (i == imgId + 2) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img5");
	// 		} else if (i == slideNub - 1) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img2");
	// 		} else if (i == slideNub - 2) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img1");
	// 		} else {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img6");
	// 		}
	// 	}
	// }
	//
	//
	// if (slideNub - imgId > 2 && imgId > 1) {
	// 	for (let i = (imgId + 1); i < slideNub; i++) {
	// 		if (i == imgId + 1) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img4");
	// 		} else if (i == imgId + 2) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img5");
	// 		} else {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img6");
	// 		}
	// 	}
	//
	// 	for (let i = imgId - 1; i >= 0; i--) {
	// 		if (i == imgId - 1) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img2");
	// 		} else if (i == imgId - 2) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img1");
	// 		} else {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img6");
	// 		}
	// 	}
	// }
	//
	// if (imgId == slideNub - 1) {
	// 	for (let i = (imgId + 1); i < slideNub; i++) {
	// 		if (i == imgId + 1) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img4");
	// 		} else if (i == imgId + 2) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img5");
	// 		} else {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img6");
	// 		}
	// 	}
	//
	// 	for (let i = imgId - 1; i >= 0; i--) {
	// 		if (i == imgId - 1) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img2");
	// 		} else if (i == imgId - 2) {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img1");
	// 		} else {
	// 			$($element).find(".slide .img:eq(" + i + ")").addClass("img6");
	// 		}
	// 	}
	// }


// 根据轮播图片数量设定图片位置对应的class
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

HomeStore.prototype.maskLayerInitSlide = function (imgId) {
	this.slideNub1 = $(this.$element1).find(".slide .img").size();             //获取轮播图片数量
	this.slideNub2 = $(this.$element2).find(".slide .img").size();             //获取轮播图片数量
	this.initChangeDom(this.slideNub1, this.$element1, imgId);
	this.initChangeDom(this.slideNub2, this.$element2, imgId);
};

HomeStore.prototype.maskLayerLeftFnc = function (slideNub, $element, type) {
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
	if (this.isSelectPerformeInfoNavId == 4) {
		if (type == "article-top") {
			var id = $(".article-content .top-slide-contnet .img3").attr("data-id");

			this.performer.articleList.map(function (article, index) {
				if (article.id == id) {
					article.isSelect = true;
				} else {
					article.isSelect = false;
				}
			});
		}
	}
};

HomeStore.prototype.maskLayerLeft = function (type) {
	this.isMaskLayerPlay = false;
	for (let i = 0; i < $(".media-video").length; i++) {
		$(".media-video")[i].pause();
	}

	if (this.isSelectPerformeInfoNavId == 4) {
		if (type == "article-top") {
			this.maskLayerLeftFnc(this.slideNub1, this.$element1, type);
		}
		if (type == "article-bottom") {
			this.maskLayerLeftFnc(this.slideNub2, this.$element2);
		}
	} else {
		this.maskLayerLeftFnc(this.slideNub1, this.$element1);
		this.maskLayerLeftFnc(this.slideNub2, this.$element2);
	}

};

HomeStore.prototype.maskLayerRightFnc = function (slideNub, $element, type) {
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


	if (this.isSelectPerformeInfoNavId == 4) {
		if (type == "article-top") {
			var id = $(".article-content .top-slide-contnet .img3").attr("data-id");

			this.performer.articleList.map(function (article, index) {
				if (article.id == id) {
					article.isSelect = true;
				} else {
					article.isSelect = false;
				}
			});
		}
	}


};

HomeStore.prototype.maskLayerRight = function (type) {

	this.isMaskLayerPlay = false;
	for (let i = 0; i < $(".media-video").length; i++) {
		$(".media-video")[i].pause();
	}
	if (this.isSelectPerformeInfoNavId == 4) {
		if (type == "article-top") {
			this.maskLayerRightFnc(this.slideNub1, this.$element1, type);
		}
		if (type == "article-bottom") {
			this.maskLayerRightFnc(this.slideNub2, this.$element2);
		}
	} else {
		this.maskLayerRightFnc(this.slideNub1, this.$element1);
		this.maskLayerRightFnc(this.slideNub2, this.$element2);
	}

};
HomeStore.prototype.touchStart = function (event) {
	var touch = event.targetTouches[0];
	this._start = touch.pageX;
};

HomeStore.prototype.touchMove = function (event) {
	var touch = event.targetTouches[0];
	this._end = (this._start - touch.pageX);
};

HomeStore.prototype.touchEnd = function (type) {
	if (this._end < -100) {
		this.maskLayerLeft(type);
		this._end = 0;
	} else if (this._end > 100) {
		this.maskLayerRight(type);
		this._end = 0;
	}
};

HomeStore.prototype.selectArticle = function (obj) {
	var id = obj.id;
	var index = obj.index;

	var nowSlideShowIndex = $(".article-content .top-slide-contnet .img3").attr("data-slide-imgid");
	var num = index - nowSlideShowIndex;
	if (num > 0) {
		for (let i = 0; i < num; i++) {
			this.maskLayerRight("article-top");
		}
	} else if (num < 0) {
		num = -num;
		for (let i = 0; i < num; i++) {
			this.maskLayerLeft("article-top");
		}
	}

	this.performer.articleList.map(function (article, inde) {
		if (article.id == id) {
			article.isSelect = true;
		} else {
			article.isSelect = false;
		}
	})


};

module.exports = alt.createStore(HomeStore, 'HomeStore');