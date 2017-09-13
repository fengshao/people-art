/**
 * Created by fengs on 2016/9/16.
 */
var WorthBuyingAction = require("../action/home-action");

function HomeStore() {
	this.isOpenClassicRepertoire = false;
	this.isOpenPerformerList = false;
	this.isOpenHomePage = false;
	this.isOpenTest = true;
	this.letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].reverse();
	this.performerArr = [
		{
			"id": "1",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "2",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "3",
			"img": "http://upload-images.jianshu.io/upload_images/971705-1158b127a710879a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "4",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "5",
			"img": "http://upload-images.jianshu.io/upload_images/971705-1158b127a710879a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "6",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "7",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "8",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "9",
			"img": "http://upload-images.jianshu.io/upload_images/971705-1158b127a710879a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "10",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "11",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "12",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "13",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "14",
			"img": "http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		},
		{
			"id": "15",
			"img": "http://upload-images.jianshu.io/upload_images/971705-1158b127a710879a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
		}
	];

	this.classicRepertoireList = [
		{"id": "1", "name": "雷雨1"},
		{"id": "2", "name": "雷雨2"},
		{"id": "3", "name": "雷雨3"},
		{"id": "4", "name": "雷雨4"},
		{"id": "5", "name": "雷雨5"},
		{"id": "6", "name": "雷雨6"},
		{"id": "7", "name": "雷雨7"},
		{"id": "8", "name": "雷雨8"},
		{"id": "9", "name": "雷雨9"},
		{"id": "10", "name": "雷雨10"},
		{"id": "11", "name": "雷雨11"},
		{"id": "12", "name": "雷雨12"},
		{"id": "13", "name": "雷雨13"},
		{"id": "14", "name": "雷雨14"}
	];

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