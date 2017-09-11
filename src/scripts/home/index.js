/**
 * Created by fengs on 2017/9/9.
 *
 */
require('./style/main.scss');
require("../../component/scrollbar/sly.js");

import Slide from '../../component/slide';
import HomePage from './view/home';
import ClassicRepertoire from './view/ClassicRepertoire';
import PerformerList from './view/performer-list';

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
		openClassicRepertoire: function () {
			HomeAction.openClassicRepertoire();
		},
		openPeopleArtList: function () {
			HomeAction.openPeopleArtList();
		},
		backOff: function (type) {
			HomeAction.backOff(type);
		}
	},
// <Slide imgDatas={this.state.imgDatas}/>

	render: function () {
		return (
			<div className="main-content">
				{
					this.state.isOpenHomePage ?
						<HomePage
							openClassicRepertoire={this.events.openClassicRepertoire}
							openPeopleArtList={this.events.openPeopleArtList}
						/> : null
				}
				{
					this.state.isOpenClassicRepertoire ?
						<ClassicRepertoire
							backOff={this.events.backOff}
						/> : null
				}
				{
					this.state.isOpenPerformerList ?
						<PerformerList
							letterArr={this.state.letterArr}
							performerArr={this.state.performerArr}
						/> : null
				}
			</div>
		);
	}
});
export default Home;