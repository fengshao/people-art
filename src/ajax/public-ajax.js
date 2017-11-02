/**
 * Created by fengs on 2017/9/15.
 */
var locationHref = window.location.href.split("#")[0];
var LocalData = require("./local-data");

var parms = {};

exports.getHomePageData = function () {
	var Deferred = $.Deferred();
	Deferred.resolve(LocalData.homePageData);
	// $.ajax({
	// 	"type": "get",
	// 	"url": "",
	// 	"success": function (data) {
	// 		Deferred.resolve(data);
	// 	},
	// 	"error": function (data) {
	// 		Deferred.resolve(data);
	// 	}
	// });
	return Deferred.promise();
};
exports.getClassicRepertoireList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": "http://118.184.11.238/api/songlist",
		"dataType":"json",
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getPerformerList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": "http://118.184.11.238/api/actorlist",
		// "dataType":"json",
		headers: {
			Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
		},
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};
