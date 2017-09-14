/**
 * Created by fengs on 2016/9/16.
 */
var PublicAjax = require("../../../ajax/public-ajax");

function HomeAction() {

	this.generateActions(
		'openClassicRepertoire',
		'openPeopleArtList',
		'backOff',
		'performerInfoDropDown',
		'selectPerformeInfoNav',
		'openPerformerInfo',
		'hideEditFrom'
	);

	this.openClassicRepertoire = function () {
		this.dispatch();
	};

	this.backOff = function (type) {
		this.dispatch(type);
	};

	this.openPerformerInfo = function (id) {
		this.dispatch(id);
	};

	this.selectPerformeInfoNav = function (id) {
		this.dispatch(id);
	};

}
module.exports = alt.createActions(HomeAction);