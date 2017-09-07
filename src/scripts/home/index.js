/**
 * Created by fengs on 2016/9/16.
 * 值得买
 */

// import LunBo from '../../component/lunbo';
import Slide from '../../component/slide';

var HomeStore = require("./store/home-store");
var HomeAction = require("./action/home-action");
var Home = React.createClass({
	getInitialState: function () {
		var data = HomeStore.getState();
		return data;
	},

	onChange: function () {
		var data = HomeStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		HomeStore.listen(this.onChange);
		// HomeAction.getWorthBuyingList();
	},

	componentWillUnmount: function () {
		HomeStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			HomeAction.deleteSpecial(data);
		},
		showEditFrom: function (rowData) {
			HomeAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			HomeAction.showAddFrom();
		},
		addSpecial: function (newData) {
			HomeAction.addSpecial(newData);
		},
		editSpecial: function (newData) {
			HomeAction.editSpecial(newData);
		},
		hideEditFrom: function () {
			HomeAction.hideEditFrom();
		}
	},
// <LunBo interval={100} number={4} boxStyle="content" interval={4000}>
// 	{
// 		this.state.imgDatas.map(function (goodsTypeID, i) {
// 			return (
// 				<li className="boxStyleLi" key={i}>
// 					<img src={goodsTypeID}/>
// 				</li>
// 			)
// 		})
// 	}
// </LunBo>
	render: function () {
		return (
			<div>
				<Slide imgDatas={this.state.imgDatas}/>
			</div>
		);
	}
});
export default Home;