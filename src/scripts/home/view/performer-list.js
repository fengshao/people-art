/**
 * Created by fengs on 2017/9/11.
 */
require('../style/performer-list.scss');
import classNames from 'classnames';

var HomePage = React.createClass({
	componentDidMount: function () {
		require("../../../component/arctext/jquery.arctext.js");
		// $(".letter-list").arctext({radius: 1100});

		var cont = $(".performer-list-content"),
			scrollbar = cont.find(".performer-list-scrollbar"),
			options = {
				"horizontal": 0,
				"itemNav": "basic",
				"dragContent": 1,
				scrollBar: scrollbar,
				// "scrollBy": 1,
				mouseDragging: 1,
				touchDragging: 1,
				scrollBy: 100
			};
		var frame = new Sly('#performer-sly', options).init();

	},
	render(){
		return (
			<div className="performer-list-content">
				<div className="performer-list-div">
					<div className="performer-list-scrollbar">
						<div className="handle"></div>
					</div>
					<div className="performer-list-scrollbar-content">
						<div className="performer-sly" id="performer-sly">
							<ul className="performer-big">
								{
									this.props.performerArr.map(function (performer, i) {
										return (
											<div className="performer-li" key={i}>
											</div>
										);
									})
								}

							</ul>
						</div>
					</div>
				</div>
				<div className="letter-content">
					<div className="letter-list">
						{
							this.props.letterArr.map(function (lerrer, i) {
								var cls = "char" + i;
								const liCls = classNames({
									'letter-li': true,
									cls: true
								});

								return (
									<div className={liCls} key={i}>
										<span className="letter-name">{lerrer}</span>
										<span className="select-img"></span>
									</div>
								);
							})
						}

					</div>
					<div className="letter-title"></div>
				</div>
			</div>
		);
	}
});
module.exports = HomePage;