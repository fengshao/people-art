/**
 * Created by fengs on 2017/9/15.
 */
var locationHref = window.location.href.split("#")[0];
var LocalData = require("./local-data");

var parms = {};

exports.getHomePageData = function () {
	var Deferred = $.Deferred();
	//Deferred.resolve(LocalData.homePageData);
	 $.ajax({
	 	"type": "get",
	 	"url": "http://118.184.11.238/api/homedata",
	 	"success": function (data) {
	 		Deferred.resolve(data);
	 	},
	 	"error": function (data) {
	 		Deferred.resolve(data);
	 	}
	 });
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
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getPerformerInfo = function (id) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": "http://118.184.11.238/api/actordetail/actor_id/" + id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};
