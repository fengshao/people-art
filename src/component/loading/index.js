/**
 * Created by fengs on 2017/9/26.
 */
import {Progress,Spin} from 'antd';
require("./index.scss");
var Gallery = React.createClass({

	render() {
		console.log("percent------->" + this.props.percent);
		// {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
		var _this = this;
		return (
			<div className="img-loading-content">
				<div className="loading-content">
					<div className="test-content">
						<Progress type="circle" width={232} strokeWidth={12} percent={this.props.percent}/>
						<Spin tip="正在读取数据..."></Spin>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = Gallery;