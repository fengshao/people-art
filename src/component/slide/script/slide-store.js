/**
 * Created by fengs on 2016/9/16.
 */
var SlideAction = require("./slide-action");

function SlideStore() {
	this.autoLb = false;          //autoLb=true为开启自动轮播
	this.autoLbtime = 1;         //autoLbtime为轮播间隔时间（单位秒）
	this.touch = true;           //touch=true为开启触摸滑动
	this.slideBt = true;         //slideBt=true为开启滚动按钮
	this.slideNub;               //轮播图片数量

	this.bindActions(SlideAction);
}

SlideStore.prototype.initSlide = function () {
	$(".slide").height($(".slide").width() * 0.56);
	this.slideNub = $(".slide .img").size();             //获取轮播图片数量
	for (let i = 0; i < this.slideNub; i++) {
		$(".slide .img:eq(" + i + ")").attr("data-slide-imgId", i);
	}

//根据轮播图片数量设定图片位置对应的class
	if (this.slideNub == 1) {
		for (let i = 0; i < this.slideNub; i++) {
			$(".slide .img:eq(" + i + ")").addClass("img3");
		}
	}
	if (this.slideNub == 2) {
		for (let i = 0; i < this.slideNub; i++) {
			$(".slide .img:eq(" + i + ")").addClass("img" + (i + 3));
		}
	}
	if (this.slideNub == 3) {
		for (let i = 0; i < this.slideNub; i++) {
			$(".slide .img:eq(" + i + ")").addClass("img" + (i + 2));
		}
	}
	if (this.slideNub > 3 && this.slideNub < 6) {
		for (let i = 0; i < this.slideNub; i++) {
			$(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
		}
	}
	if (this.slideNub >= 6) {
		for (let i = 0; i < this.slideNub; i++) {
			if (i < 5) {
				$(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
			} else {
				$(".slide .img:eq(" + i + ")").addClass("img5");
			}
		}
	}
	this.imgClickFy();
};

SlideStore.prototype.k_touch = function () {
	var _this = this;
	var _start = 0, _end = 0, _content = document.getElementById("slide");
	_content.addEventListener("touchstart", touchStart, false);
	_content.addEventListener("touchmove", touchMove, false);
	_content.addEventListener("touchend", touchEnd, false);
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
			_this.left();
			_end = 0;
		} else if (_end > 100) {
			_this.right();
			_end = 0;
		}
	}

};

SlideStore.prototype.left = function () {
	var fy = new Array();
	for (let i = 0; i < this.slideNub; i++) {
		fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (let i = 0; i < this.slideNub; i++) {
		if (i == (this.slideNub - 1)) {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[0]);
		} else {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i + 1]);
		}
	}
	// this.imgClickFy();
};

SlideStore.prototype.right = function () {
	var fy = new Array();
	for (let i = 0; i < this.slideNub; i++) {
		fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (let i = 0; i < this.slideNub; i++) {
		if (i == 0) {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[this.slideNub - 1]);
		} else {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i - 1]);
		}
	}
};

SlideStore.prototype.imgClickFy = function () {
	var _this = this;
	$(".slide .img").removeAttr("onclick");
	$(".slide").delegate(".img2,.img1", "click", function () {
		_this.left();
	});
	$(".slide").delegate(".img4,.img5", "click", function () {
		_this.right();
	});
};

module.exports = alt.createStore(SlideStore, 'SlideStore');