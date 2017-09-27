/**
 * Created by fengshao on 2017/9/27.
 */
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
		var _this = this;
		return (
			<div className="gallery" ref="gallery" style={{"display":"none"}}>
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
		);
	}
});
module.exports = Gallery;