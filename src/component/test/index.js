/**
 * Created by fengshao on 2017/9/8.
 */
require("./index.css");
//require("./script");
//import image1 from './image/1.png';
//import image2 from './image/2.png';
//import image3 from './image/3.png';
//import image4 from './image/4.png';
//import image5 from './image/5.png';
import React from 'react';
//<button onclick="left()">上一页</button>
//<button onclick="right()">下一页</button>
//<div className="img"><img src={image1}/></div>
//<div className="img"><img src={image2}/></div>
//	<div className="img"><img src={image3}/></div>
//	<div className="img"><img src={image4}/></div>
//	<div className="img"><img src={image5}/></div>

//窗口大小改变时改变轮播图宽高
$(window).resize(function () {
	$(".slide").height($(".slide").width() * 0.56);
});


//右滑动
function right() {
	var fy = new Array();
	for (let i = 0; i < slideNub; i++) {
		fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (let i = 0; i < slideNub; i++) {
		if (i == 0) {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[slideNub - 1]);
		} else {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i - 1]);
		}
	}
	imgClickFy();
	slideLi();
};

//左滑动
function left() {
	var fy = new Array();
	for (let i = 0; i < slideNub; i++) {
		fy[i] = $(".slide .img[data-slide-imgId=" + i + "]").attr("class");
	}
	for (i = 0; i < slideNub; i++) {
		if (i == (slideNub - 1)) {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[0]);
		} else {
			$(".slide .img[data-slide-imgId=" + i + "]").attr("class", fy[i + 1]);
		}
	}
	imgClickFy();
	slideLi();
};

//轮播图片左右图片点击翻页
function imgClickFy() {
	$(".slide .img").removeAttr("onclick");
	$(".slide .img2").attr("onclick", "left()");
	$(".slide .img4").attr("onclick", "right()");
};

//修改当前最中间图片对应按钮选中状态
function slideLi() {
	var slideList = parseInt($(".slide .img3").attr("data-slide-imgId")) + 1;
	$(".slide-bt span").removeClass("on");
	$(".slide-bt span[data-slide-bt=" + slideList + "]").addClass("on");
}

//轮播按钮点击翻页
function tz(id) {
	var tzcs = id - (parseInt($(".slide .img3").attr("data-slide-imgId")) + 1);
	if (tzcs > 0) {
		for (let i = 0; i < tzcs; i++) {
			setTimeout(function () {
				right();
			}, 1);
		}
	}
	if (tzcs < 0) {
		tzcs = (-tzcs);
		for (let i = 0; i < tzcs; i++) {
			setTimeout(function () {
				left();
			}, 1);
		}
	}
	slideLi();
};



var Slide = React.createClass({
	componentDidMount: function () {
		require("./script");
	},
	render: function () {
		return (
			<div className="container">
				<div id="slide" className="index-slide slide" alt="star">
					{
						this.props.imgDatas.map(function (goodsTypeID, i) {
							return (
								<div className="img"><img src={goodsTypeID}/></div>
							)
						})
					}


					<div className="slide-bt"></div>
				</div>

			</div>
		);
	}
});
export default Slide;
