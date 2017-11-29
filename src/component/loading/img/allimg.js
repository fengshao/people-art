/**
 * Created by fengs on 2017/11/27.
 */
/**
 * Created by fengshao on 2017/9/27.
 */
import classNames from 'classnames';

var AllImg = React.createClass({
	render() {
		var allImg = [];
		for (let i = 1; i < 26; i++) {
			allImg.push(i);
		}
		return (
			<div className="all-img" style={{"display":"none"}}>
				{
					allImg.map(function (key, index) {
						var imgcls = classNames({
							[`img${key}`]: true
						});
						return (
							<div key={index} className={imgcls}></div>
						)
					})
				}
			</div>
		);
	}
});
module.exports = AllImg;