/**
 * Created by fengs on 2016/9/16.
 */
var PublicAjax = require("../../../ajax/public-ajax");

function HomeAction() {

	this.generateActions(
		'openClassicRepertoire',
		'openPeopleArtList',
		'backOff',
		'editSpecial',
		'showEditFrom',
		'showAddFrom',
		'hideEditFrom'
	);

	this.openClassicRepertoire = function () {
		this.dispatch();
	};
	this.backOff = function (type) {
		this.dispatch(type);
	};
}
module.exports = alt.createActions(HomeAction);