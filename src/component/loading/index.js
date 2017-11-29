/**
 * Created by fengs on 2017/9/26.
 */
import {Progress,Spin} from 'antd';
require("./index.scss");
require("./loadingStyle/loaders.css");

var Gallery = React.createClass({

	render() {
		//<div className="loading-title">{this.props.percent} %</div>
		// <div className="loading-title">正在读取数据</div>
		var _this = this;
		return (
			<div className="img-loading-content">
				<div className="loading-content">
					<div className="test-content">
						<div className="loader-inner pacman loading-title">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = Gallery;