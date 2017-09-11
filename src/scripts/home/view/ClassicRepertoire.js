/**
 * Created by fengs on 2017/9/10.
 */
require('../style/classicRepertoire.scss');
var ClassicRepertoire = React.createClass({

	componentDidMount: function () {
		var cont = $(".classic-repertoire-content"),
			// frame = cont.find(".repertoire-sly"),
			scrollbar = cont.find(".repertoire-scrollbar"),
			options = {
				"horizontal": 1,
				"itemNav": "basic",
				"dragContent": 1,
				// "startAt": 3,
				scrollBar: scrollbar,
				"scrollBy": 1,
				mouseDragging: 1,
				touchDragging: 1
			};
		var frame = new Sly('#repertoire-sly', options).init();
	},

	render(){

		return (
			<div className="classic-repertoire-content">
				<div className="repertoire-title">《蔡文姬》</div>
				<div className="repertoire-video-play-content"></div>
				<div className="repertoire-list-content" id="repertoire-list-content">
					<div className="repertoire-scrollbar">
						<div className="handle"></div>
					</div>
					<div className="test-cls">
						<div className="repertoire-sly" id="repertoire-sly">
							<ul className="big cfix">
								<div className="repertoire-list-div">
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨1》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
								</div>
								<div className="repertoire-list-div">
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨2》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
								</div>
								<div className="repertoire-list-div">
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨3》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
								</div>
								<div className="repertoire-list-div">
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨4》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
								</div>
								<div className="repertoire-list-div">
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨5》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
								</div>
								<div className="repertoire-list-div">
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨6》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
								</div>
								<div className="repertoire-list-div">
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨7》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
									<li className="repertoire-list-li">
										<div className="repertoire-video-img"></div>
										<div className="repertoire-video-title">《雷雨》</div>
									</li>
								</div>
							</ul>
						</div>
					</div>
					<div className="repertoire-scrollbar">
						<div className="handle"></div>
					</div>
				</div>
				<div className="back-off" onClick={this.props.backOff.bind(this,"homePage")}></div>
			</div>
		);
	}
});
module.exports = ClassicRepertoire;