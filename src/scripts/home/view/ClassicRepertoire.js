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
		var performerList = this.props.performerList;
		var length = Math.ceil(performerList.length / 3);
		var arrTest = [];
		for (let i = 0; i < length; i++) {
			arrTest.push(i);
		}

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
								{
									arrTest.map(function (index, key) {
										return (
											<div className="repertoire-list-div" key={key}>
												{
													performerList.map(function (performer, i) {

														return (
															i < 3 * (key + 1) && i >= 3 * key ?
																<li className="repertoire-list-li" key={i}>
																	<div
																		className="repertoire-video-img">{performer.id}</div>
																	<div
																		className="repertoire-video-title">{performer.name}</div>
																</li> :
																null
														)
													})
												}
											</div>
										)
									})
								}
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