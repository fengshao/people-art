/**
 * Created by fengs on 2017/9/7.
 */
require("./newsdetail.css");
require("./jquery.SuperSlide.2.1.1.js");
require("./newsdetail");
import left1 from './images/left1.jpg'
import right1 from './images/right1.jpg'
import React from 'react';
var Slide = React.createClass({
	render: function () {
		return (
			<div>
				<center>
					<div className="detail_context_pic">
						<div className="detail_context_pic_top">
							<a href="#"><img src={this.props.imgDatas[0]} alt="" id="pic1" curindex="0"/></a>
							<a id="preArrow" href="javascript:void(0)" className="contextDiv" title="上一张">
								<span id="preArrow_A"></span>
							</a>
							<a id="nextArrow" href="javascript:void(0)" className="contextDiv" title="上一张">
								<span id="nextArrow_A"></span>
							</a>
							<div id="miaoshuwarp">
								<div className="miaoshu">
								</div>
							</div>
						</div>
						<div className="detail_context_pic_bot">
							<div className="detail_picbot_left">
								<a href="javascript:void(0)" id="preArrow_B"><img
									src={left1} alt="上一个"/></a>
							</div>
							<div className="detail_picbot_mid">
								<ul>
									{
										this.props.imgDatas.map(function (goodsTypeID, i) {
											return (
												<li>
													<a href='javascript:void(0);'>
														<img
															src={goodsTypeID}
															width='90px'
															height='60px'
															title='2014年8月10日19点15分，深圳上空的超级月亮。'
															alt='2014年8月10日19点15分，深圳上空的超级月亮。'
															bigimg={goodsTypeID}
															text='2014年8月10日19点15分，深圳上空的超级月亮。'/>
													</a>
												</li>
											)
										})
									}
								</ul>
							</div>
							<div className="detail_picbot_right">
								<a href="javascript:void(0)" id="nextArrow_B">
									<img src={right1} alt="下一个"/></a>
							</div>
						</div>
					</div>
				</center>
			</div>
		);
	}
});
export default Slide;
