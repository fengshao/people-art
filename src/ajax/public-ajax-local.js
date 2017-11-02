/**
 * Created by fengshao on 2017/9/15.
 */
var locationHref = window.location.href.split("#")[0];
var LocalData = require("./local-data");

//获取首页信息
exports.getHomePageData = function () {
	var Deferred = $.Deferred();
	Deferred.resolve(LocalData.homePageData);
	return Deferred.promise();
};


//获取经典曲目列表信息
exports.getClassicRepertoireList = function () {
	var Deferred = $.Deferred();
	setTimeout(function () {
		Deferred.resolve(LocalData.classicRepertoireData);
	}, 3000);
	//$.ajax({
	//	"type": "get",
	//	"url": "http://www.baidu.com",
	//	"success": function (data) {
	//		Deferred.resolve(LocalData.classicRepertoireData);
	//	},
	//	"error": function (data) {
	//		Deferred.resolve(LocalData.classicRepertoireData);
	//	}
	//});
	return Deferred.promise();
};

//获取演员列表
exports.getPerformerList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": "http://www.baidu.com",
		"success": function (data) {
			Deferred.resolve(LocalData.performerList);
		},
		"error": function (data) {
			Deferred.resolve(LocalData.performerList);
		}
	});
	//Deferred.resolve(LocalData.performerList);
	return Deferred.promise();
};







