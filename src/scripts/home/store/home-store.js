/**
 * Created by fengs on 2016/9/16.
 */
var WorthBuyingAction = require("../action/home-action");

function WorthBuyingStore() {
	this.worthBuyingList = [];
	this.editRowData = {};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;

	this.imgDatas = ["http://upload-images.jianshu.io/upload_images/971705-2c8d6d5d8d3b59bc.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-1158b127a710879a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-1ebf3743a7d163c7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
		"http://upload-images.jianshu.io/upload_images/971705-6d38b15221a904c9.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"]

	this.bindActions(WorthBuyingAction);
}

WorthBuyingStore.prototype.getWorthBuyingList = function (worthBuyingList) {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url_wechat: "",
		url_qq: "",
		url_app: "",
		img_qq: "",
		img_app: "",
		img_wechat: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
	this.worthBuyingList = worthBuyingList;
};

WorthBuyingStore.prototype.deleteSpecial = function (obj) {
	if (obj.data.error == 0) {
		var id = obj.id;
		for (var i = 0; i < this.worthBuyingList.length; i++) {
			if (id == this.worthBuyingList[i].id) {
				this.worthBuyingList.splice(i, 1);
			}
		}
	}

};

WorthBuyingStore.prototype.showEditFrom = function (rowData) {
	this.editRowData = rowData;
	this.isShowEditFrom = true;
};

WorthBuyingStore.prototype.showAddFrom = function () {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url_wechat: "",
		url_qq: "",
		url_app: "",
		img_qq: "",
		img_app: "",
		img_wechat: ""
	};
	this.isShowAddFrom = true;
};

WorthBuyingStore.prototype.addSpecial = function () {
};

WorthBuyingStore.prototype.editSpecial = function () {
};

WorthBuyingStore.prototype.hideEditFrom = function () {
	this.editRowData = {
		title: "",
		sort: "",
		id: "",
		url_wechat: "",
		url_qq: "",
		url_app: "",
		img_qq: "",
		img_app: "",
		img_wechat: ""
	};
	this.isShowEditFrom = false;
	this.isShowAddFrom = false;
};

module.exports = alt.createStore(WorthBuyingStore, 'WorthBuyingStore');