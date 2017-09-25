/**
 * Created by fengs on 2017/9/25.
 */
require('./index.scss');
import {Progress, Button, Icon} from 'antd';
const ProgressCircle = Progress.Circle;

var Loading = React.createClass({
	render(){
		// <div className="progress-title"></div>
		console.log(this.props.percent);
		return (
			<div className="loading-content">
				<Progress type="circle" percent={this.props.percent}/>
			</div>
		);
	}
});
module.exports = Loading;