/**
 * Created by fengs on 2016/9/16.
 */

function SlideAction() {

	this.generateActions(
		'initSlide',
		'k_touch',
		'right',
		'left',
		'imgClickFy'
	);
}
module.exports = alt.createActions(SlideAction);