/**
 * Created by fengs on 2016/9/16.
 */

function WorthBuyingAction() {

	this.generateActions(
		'initSlide',
		'k_touch',
		'right',
		'left',
		'imgClickFy'
	);
}
module.exports = alt.createActions(WorthBuyingAction);