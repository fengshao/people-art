/**
 * Created by fengs on 2017/9/9.
 *
 */
require('./style/main.scss');

import Slide from '../../component/slide';
import HomePage from './view/home';

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
// <Slide imgDatas={this.state.imgDatas}/>

	render: function () {
		return (
			<div className="main-content">
				<HomePage/>
			</div>
		);
	}
});
export default Home;