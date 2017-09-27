/**
 * Created by fengs on 2017/9/9.
 */
require('../style/home.scss');
var HomePage = React.createClass({
	render(){
		return (
			<div className="home-content">
				<div className="click-div" onClick={this.props.showPerformerList.bind(this)}>
					<div className="performer-time-content">{this.props.homePageData.time}</div>
				</div>
				<div className="bottom-content">
					<div className="bottom-left" onClick={this.props.showClassicRepertoirePage.bind(this)}>
						<div className="left-title-img"></div>
						<div className="left-click-in-img"></div>
					</div>
					<div className="bottom-right">
						<div className="right-thumbnail">
							<img src={this.props.homePageData.img.length>0 ?
							this.props.homePageData.img[0] : ""}
								 alt="暂无图片"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = HomePage;