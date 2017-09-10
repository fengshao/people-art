/**
 * Created by fengs on 2016/9/16.
 */
var WorthBuyingAction = require("../action/home-action");

function HomeStore() {
	this.isOpenClassicRepertoire = false;
	this.isOpenPeopleArtList = false;
	this.isOpenHomePage = true;

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
	this.isOpenPeopleArtList = false;
	this.isOpenHomePage = false;
};

//进入演员列表页
HomeStore.prototype.openPeopleArtList = function (obj) {
	this.isOpenClassicRepertoire = false;
	this.isOpenPeopleArtList = true;
	this.isOpenHomePage = false;
};

//回到上一页
HomeStore.prototype.backOff = function (type) {
	switch (type) {
		case "homePage":
			this.isOpenClassicRepertoire = false;
			this.isOpenPeopleArtList = false;
			this.isOpenHomePage = true;
			break;
	}
};


module.exports = alt.createStore(HomeStore, 'HomeStore');