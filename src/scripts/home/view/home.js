/**
 * Created by fengs on 2017/9/9.
 */
require('../style/home.scss');
var thumbnail = require("../../../images/home/thumbnail.png");
var HomePage = React.createClass({
	render(){
		return (
			<div className="home-content">
				<div className="click-div" onClick={this.props.openPeopleArtList.bind(this)}>
					<div className="performer-time-content">1952-2017</div>
				</div>
				<div className="bottom-content">
					<div className="bottom-left" onClick={this.props.openClassicRepertoire.bind(this)}>
						<div className="left-title-img"></div>
						<div className="left-click-in-img"></div>
					</div>
					<div className="bottom-right">
						<div className="right-thumbnail">
							<img src={thumbnail} alt="暂无图片"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = HomePage;