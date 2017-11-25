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
	this._start = 0;
	this._end = 0;
	this.touchHeight = 891;
	this.touchTop = 877;
	this.clickedIndex = 0;
	this.performerID = "";

	this.homePageData = {
		"Time": ""
	};
	this.isSelectPerformeInfoNavId = "1";
	this.performeInfoNavList = [
		{"id": "1", "name": "话剧作品", "isSelect": true},
		{"id": "2", "name": "他院作品", "isSelect": false},
		{"id": "3", "name": "影视作品", "isSelect": false},
		{"id": "4", "name": "发表文章", "isSelect": false}
	];
	this.previewContent = "";
	this.nextContent = "";

	this.imageUrls = [];
	this.percent = 0;
	this.imgNum = 0;

	this.isHomeLoadingImg = true;
	this.isClassicRepertoireLoadingImg = true;
	this.isPerformerListLoadingImg = true;
	this.isPerformerInfoLoadingImg = true;

	this.ajaxSucc = false;

	this.performeInfoReturn = false;

	this.bindActions(HomeAction);
}


HomeStore.prototype.changeAjaxSucc = function () {
	this.ajaxSucc = false;
};

//获取首页数据
HomeStore.prototype.getHomePageData = function (obj) {
	this.homePageData = obj.homePageData.data || this.homePageData;
	this.classicRepertoireList = obj.classicRepertoireList.data || [];
	if (this.classicRepertoireList.length > 0) {
		this.classicRepertoire = _.extend(this.classicRepertoire, this.classicRepertoireList[0]);
	}
	this.ajaxSucc = true;
};


HomeStore.prototype.showClassicRepertoirePage = function () {
	this.isOpenClassicRepertoire = true;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = false;
};

////获取经典剧目列表
//HomeStore.prototype.getClassicRepertoireList = function () {
//this.classicRepertoireList = classicRepertoireList;
//if (this.classicRepertoireList.length > 0) {
//	this.classicRepertoire = _.extend(this.classicRepertoire, this.classicRepertoireList[0]);
//}
//this.ajaxSucc = true;
//};

//获取演员姓氏列表
HomeStore.prototype.getLetterArr = function (letterArr) {
	this.homePageData = letterArr;
};

HomeStore.prototype.showPerformerList = function () {
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerInfo = false;
	this.isOpenHomePage = false;
	this.isOpenPerformerList = true;
};

//获取演员列表
HomeStore.prototype.getPerformerList = function (performerList) {
	var _this = this;
	var letterArr = [];
	_this.isShowPerformerList = [];
	var performerList = performerList.data || [];
	//this.classicRepertoireList = obj.classicRepertoireList;

	let i = 0;
	for (var key in performerList) {
		var letter = {"id": "", "letter": ""};
		letter.id = i;
		letter.letter = key;
		letterArr.push(letter);
		i++;
	}

	letterArr.sort(function (a, b) {
		return (b.letter).charCodeAt() - (a.letter).charCodeAt()
	});

	this.letterArr = letterArr;

	if (this.letterArr.length > 0) {
		this.letterArr.map(function (letter, index) {
			letter.isSelect = false;
		});
		this.isShowLeterStr = this.letterArr[this.letterArr.length - 1];
		this.letterArr[this.letterArr.length - 1].isSelect = true;

		for (var key in performerList) {
			if (key == this.letterArr[this.letterArr.length - 1].letter) {
				_this.isShowPerformerList = performerList[key];
			}
		}
	}


	// obj.performerList.map(function (performer, index) {
	// 	if (performer.surname == obj.letterArr[0].letter) {
	// 		_this.isShowPerformerList.push(performer)
	// 	}
	// });
	this.performerList = performerList;
	// var loopVideoArr = [];
	// var videoRegular = /\.(mp4|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb)$/i;

	//obj.classicRepertoireList.map(function (classicRepertoire, index) {
	//	if (classicRepertoire.video && videoRegular.test(classicRepertoire.video)) {
	//		loopVideoArr.push(classicRepertoire);
	//	}
	//});
	// this.loopVideoArr = loopVideoArr;
	this.ajaxSucc = true;
};

//根据选中字母展示演员列表
HomeStore.prototype.selectLetter = function (letterID) {
	var _this = this;
	_this.isShowPerformerList = [];
	var letterStr = "";
	this.letterArr.map(function (letter, index) {
		if (letterID == letter.id) {
			letter.isSelect = true;
			_this.isShowLeterStr = letter;
			letterStr = letter.letter;
		} else {
			letter.isSelect = false;
		}
	});

	for (var key in this.performerList) {
		if (key == letterStr) {
			_this.isShowPerformerList = this.performerList[key];
		}
	}

	// this.performerList.map(function (performer, index) {
	// 	if (performer.surname == letterID) {
	// 		_this.isShowPerformerList.push(performer)
	// 	}
	// });

};


//进入演员信息页
HomeStore.prototype.openPerformerInfo = function (id) {
	var _this = this;
	this.ajaxSucc = false;
	this.performeInfoReturn = true;
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = false;
	this.isOpenPerformerInfo = true;
	this.performerID = id;

	// for (var key in this.performerList) {
	// 	if (key == this.letterArr[0].letter) {
	// 		_this.isShowPerformerList = performerList[key];
	// 	}
	// }

	//this.isShowPerformerList.map(function (performer, index) {
	//	if (performer.Id == id) {
	//}
	//});
	// this.ajaxSucc = false;
};
HomeStore.prototype.getPerformerInfo = function (performer) {
	this.performer = performer.data || this.performer;
	this.ajaxSucc = true;
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
			this.performeInfoReturn = false;

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

HomeStore.prototype.changePreview = function (obj) {
	this.changePreviewFnc(obj.id, obj.dataList);
};

HomeStore.prototype.changePreviewFnc = function (id, dataList) {
	var dataListLength = dataList.length;
	if (this.isSelectPerformeInfoNavId == 4) {
		for (let i = 0; i < dataListLength; i++) {
			if (dataList[i].article_id == id) {
				if (i == 0) {
					// this.previewContent = dataList[dataListLength - 1].content;
					this.previewContent = "";
					this.nextContent = dataList[i + 1] && dataList[i + 1].content;
				} else if (i == (dataListLength - 1)) {
					this.previewContent = dataList[i - 1].content;
					this.nextContent = "";
					// this.nextContent = dataList[0].content;
				} else {
					this.previewContent = dataList[i - 1].content;
					this.nextContent = dataList[i + 1].content;
				}
			}
		}
	} else {
		for (let i = 0; i < dataListLength; i++) {
			if (dataList[i].Id == id) {
				if (i == 0) {
					// this.previewContent = dataList[dataListLength - 1].preview;
					this.previewContent = "";
					this.nextContent = dataList[i + 1] && dataList[i + 1].Preview;
				} else if (i == (dataListLength - 1)) {
					this.previewContent = dataList[i - 1].Preview;
					this.nextContent = "";
					// this.nextContent = dataList[0].preview;
				} else {
					this.previewContent = dataList[i - 1].Preview;
					this.nextContent = dataList[i + 1].Preview;
				}
			}
		}
	}
};

HomeStore.prototype.showMaskLayer = function (obj) {
	this.isShowMaskLayer = true;
	this.clickedIndex = obj.clickedIndex;
	var id = obj.id;
	var dataList = obj.dataList;
	this.changePreviewFnc(id, dataList);
};

HomeStore.prototype.hideMaskLayer = function () {
	this.isShowMaskLayer = false;
	this.isMaskLayerPlay = false;
	this.clickedIndex = 0;
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

HomeStore.prototype.setPercent = function () {
	var v = (parseFloat(++this.imgNum) / this.imageUrls.length).toFixed(2);
	this.percent = Math.round(v * 100);
	if (Math.round(v * 100) >= 100) {
		this.imageUrls = [];
	}
};

HomeStore.prototype.preLoadImg = function (type) {
	/*get all imgs those tag is <img>
	 var imgs = document.images;
	 for (var i = 0; i < imgs.length; i++) {
	 images.push(imgs[i].src);
	 }*/
	this.imageUrls = [];
	this.imgNum = 0;


	switch (type) {
		case "performerInfo":
			this.isPerformerInfoLoadingImg = false;
			break;
		case "classicRepertoire":
			this.isClassicRepertoireLoadingImg = false;
			break;
		case "performerList":
			this.isPerformerListLoadingImg = false;
			break;
		case "home":
			this.isHomeLoadingImg = false;
			break;
	}

	var images = [];
	//get all images in style
	var cssImages = this.getallBgimages();
	for (var j = 0; j < cssImages.length; j++) {
		images.push(cssImages[j]);
	}
	this.imageUrls = images;
};

//get all images in style（此方法引用其他博客的）
HomeStore.prototype.getallBgimages = function () {
	var url, B = [], A = document.getElementsByTagName('*');
	A = B.slice.call(A, 0, A.length);
	while (A.length) {
		url = document.deepCss(A.shift(), 'background-image');
		if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
		url = url[1];
		if (url && B.indexOf(url) == -1) B[B.length] = url;
	}
	return B;
};

document.deepCss = function (who, css) {
	if (!who || !who.style) return '';
	var sty = css.replace(/\-([a-z])/g, function (a, b) {
		return b.toUpperCase();
	});
	if (who.currentStyle) {
		return who.style[sty] || who.currentStyle[sty] || '';
	}
	var dv = document.defaultView || window;
	return who.style[sty] ||
		dv.getComputedStyle(who, "").getPropertyValue(css) || '';
};

Array.prototype.indexOf = Array.prototype.indexOf ||
	function (what, index) {
		index = index || 0;
		var L = this.length;
		while (index < L) {
			if (this[index] === what) return index;
			++index;
		}
		return -1;
	}

module.exports = alt.createStore(HomeStore, 'HomeStore');