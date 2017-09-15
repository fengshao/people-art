/**
 * Created by fengshao on 2017/9/8.
 */
exports.initSlide = function ($element) {
	this.slideNub = $element.find(".slide .img").size();             //获取轮播图片数量
	for (let i = 0; i < this.slideNub; i++) {
		$element.find(".slide .img:eq(" + i + ")").attr("data-slide-imgId", i);
	}

//根据轮播图片数量设定图片位置对应的class
	if (this.slideNub == 1) {
		for (let i = 0; i < this.slideNub; i++) {
			$element.find(".slide .img:eq(" + i + ")").addClass("img3");
		}
	}
	if (this.slideNub == 2) {
		for (let i = 0; i < this.slideNub; i++) {
			$element.find(".slide .img:eq(" + i + ")").addClass("img" + (i + 3));
		}
	}
	if (this.slideNub == 3) {
		for (let i = 0; i < this.slideNub; i++) {
			$element.find(".slide .img:eq(" + i + ")").addClass("img" + (i + 2));
		}
	}
	if (this.slideNub > 3 && this.slideNub < 6) {
		for (let i = 0; i < this.slideNub; i++) {
			$element.find(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
		}
	}
	if (this.slideNub >= 6) {
		for (let i = 0; i < this.slideNub; i++) {
			if (i < 5) {
				$element.find(".slide .img:eq(" + i + ")").addClass("img" + (i + 1));
			} else {
				$element.find(".slide .img:eq(" + i + ")").addClass("img6");
			}
		}
	}
	this.imgClickFy($element);
};

exports.k_touch = function ($element) {
	var _this = this;
	var _start = 0, _end = 0, _content = $element.find("#slide")[0];
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
			_this.left($element);
			_end = 0;
		} else if (_end > 100) {
			_this.right($element);
			_end = 0;
		}
	}

};

exports.left = function ($element) {
	var fy = new Array();
	for (let i = 0; i < this.slideNub; i++) {
		fy[i] = $element.find(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (let i = 0; i < this.slideNub; i++) {
		if (i == (this.slideNub - 1)) {
			$element.find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[0]);
		} else {
			$element.find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i + 1]);
		}
	}
	// this.imgClickFy();
};

exports.right = function ($element) {
	var fy = new Array();
	for (let i = 0; i < this.slideNub; i++) {
		fy[i] = $element.find(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (let i = 0; i < this.slideNub; i++) {
		if (i == 0) {
			$element.find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[this.slideNub - 1]);
		} else {
			$element.find(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i - 1]);
		}
	}
};

exports.imgClickFy = function ($element) {
	var _this = this;
	$element.find(".slide .img").removeAttr("onclick");
	$element.find(".slide").undelegate(".img2,.img1", "click").delegate(".img2,.img1", "click", function () {
		_this.left($element);
	});
	$element.find(".slide").undelegate(".img4,.img5", "click").delegate(".img4,.img5", "click", function () {
		_this.right($element);
	});
};
exports.removeEventFnc = function ($element) {
	$element.find(".slide").undelegate(".img2,.img1", "click");
	$element.find(".slide").undelegate(".img4,.img5", "click");
};