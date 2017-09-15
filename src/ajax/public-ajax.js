/**
 * Created by fengs on 2017/9/15.
 */
var locationHref = window.location.href.split("#")[0];

var parms = {};

exports.getHomePageData = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": "",
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};
