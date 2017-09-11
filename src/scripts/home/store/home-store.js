/**
 * Created by fengs on 2016/9/16.
 */
var WorthBuyingAction = require("../action/home-action");

function HomeStore() {
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = true;
	this.letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].reverse();
	this.letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].reverse();
	this.performerArr = [];
	for (var i = 0; i < 30; i++) {
		this.performerArr.push(i);
	}
	this.imgDatas = ["http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-1158b127a710879a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-1ebf3743a7d163c7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-6d38b15221a904c9.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-1158b127a710879a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-1ebf3743a7d163c7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-6d38b15221a904c9.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"];

	this.bindActions(WorthBuyingAction);
}

//进入经典曲目页面
HomeStore.prototype.openClassicRepertoire = function (worthBuyingList) {
	this.isOpenClassicRepertoire = true;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = false;
};

//进入演员列表页
HomeStore.prototype.openPeopleArtList = function (obj) {
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerList = true;
	this.isOpenHomePage = false;
};

//回到上一页
HomeStore.prototype.backOff = function (type) {
	switch (type) {
		case "homePage":
			this.isOpenClassicRepertoire = false;
			this.isOpenPerformerList = false;
			this.isOpenHomePage = true;
			break;
	}
};


module.exports = alt.createStore(HomeStore, 'HomeStore');