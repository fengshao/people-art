/**
 * Created by fengs on 2017/9/9.
 */
require('../style/home.scss');
var AddBannerForm = React.createClass({
	render(){

		return (
			<div className="home-content">
				<div className="click-div">
					<div className="performer-time-content">1952-2017</div>
				</div>
				<div className="bottom-content">
					<div className="bottom-left">
						<div className="left-title-img"></div>
						<div className="left-click-in-img"></div>
					</div>
					<div className="bottom-right">
						<div className="right-thumbnail"></div>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = AddBannerForm;