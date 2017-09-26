/**
 * Created by fengs on 2017/9/26.
 */
import {Progress} from 'antd';
require("./index.scss");
function imagesLoaded(parentNode) {
	const imgElements = parentNode.querySelectorAll('img');
	for (const img of imgElements) {
		if (!img.complete) {
			return false;
		}
	}
	return true;
}

var Gallery = React.createClass({

	handleImageChange() {
		// In React 0.13 use: 'this.refs.gallery.getDOMNode()'
		const galleryElement = this.refs.gallery;
		debugger
		this.props.setPercent(!imagesLoaded(galleryElement));
		// this.setState({
		// 	loading: !imagesLoaded(galleryElement)
		// });
	},

	renderImage(imageUrl) {
		return (
			<div>
				<img
					src={imageUrl}
					onLoad={this.handleImageChange.bind(this)}
					onError={this.handleImageChange.bind(this)}
				/>
			</div>
		);
	},

	render() {
		console.log("percent------->" + this.props.percent);
		// {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
		var _this = this;
		return (
			<div className="img-loading-content">
				<div className="gallery" ref="gallery">
					<div className="images">
						{
							this.props.imageUrls.map(function (imageUrl, index) {
								return (
									<img key={index}
										 src={imageUrl}
										 onLoad={_this.handleImageChange.bind(_this)}
										 onError={_this.handleImageChange.bind(_this)}
									/>
								)
							})
						}
					</div>
				</div>
				<div className="loading-content">
					<div className="test-content">
						<Progress type="circle" width="232" strokeWidth="12" percent={this.props.percent}/>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = Gallery;