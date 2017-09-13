/**
 * Created by fengshao on 2017/9/12.
 */
require('./test.scss');
import Slide from '../../../component/slide';

var ClassicRepertoire = React.createClass({

	componentDidMount: function () {
		Slide.initSlide($("top-slide"));
		Slide.k_touch($("top-slide"));
	},

//<div className="bottom-slide">
//	<div className="slide-container">
//		<div id="slide" className="index-slide slide" alt="star">
//			{
//				this.props.imgDatas.map(function (goodsTypeID, i) {
//					return (
//						<div key={i} className="img"><img src={goodsTypeID}/></div>
//					)
//				})
//			}
//			<div className="slide-bt"></div>
//		</div>
//	</div>
//</div>


	render(){

		return (
			<div className="test-content" id="test-content">
				<div className="top-slide">
					<div className="slide-container">
						<div id="slide" className="index-slide slide" alt="star">
							{
								this.props.imgDatas.map(function (goodsTypeID, i) {
									return (
										<div key={i} className="img"><img src={goodsTypeID}/></div>
									)
								})
							}
							<div className="slide-bt"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = ClassicRepertoire;