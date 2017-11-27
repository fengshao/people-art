/**
 * Created by fengs on 2017/9/9.
 */
require('../style/home.scss');
require('../style/img.scss');
var loopVideoArr = [];
var videoRegular = /\.(mp4|swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb)$/i;

function loopVideo() {
	var vList = loopVideoArr; // 初始化播放列表 var
	var vLen = vList.length; // 播放列表的长度
	var curr = 1; // 当前播放的视频
	var video = document.getElementById("loop-video-media");
	video.addEventListener('ended', play);
	// play();
	function play() {
		var video = document.getElementById("loop-video-media");
		video.src = vList[curr].Video;
		video.poster = vList[curr].Preview;
		video.load(); //如果短的话，可以加载完成之后再播放，监听 canplaythrough 事件即可
		video.play();
		curr++;
		if (curr >= vLen) {
			curr = 0; // 播放完了，重新播放
		}
	}
};
var HomePage = React.createClass({
	componentDidMount: function () {
		if (this.props.classicRepertoireList.length > 0) {
			$("#loop-video-media")[0].play();
			this.props.classicRepertoireList.map(function (classicRepertoire, index) {
				if (classicRepertoire.video && videoRegular.test(classicRepertoire.video)) {
					loopVideoArr.push(classicRepertoire);
				}
			});
			loopVideo();
		}
	},
	componentDidUpdate: function () {
		if (this.props.classicRepertoireList.length > 0) {
			$("#loop-video-media")[0].play();
			this.props.classicRepertoireList.map(function (classicRepertoire, index) {
				if (classicRepertoire.video && videoRegular.test(classicRepertoire.video)) {
					loopVideoArr.push(classicRepertoire);
				}
			});
			loopVideo();
		}
	},
	render(){
		return (
			<div className="home-content">
				<div className="click-div" onClick={this.props.showPerformerList.bind(this)}>
					<div className="performer-time-content">{this.props.homePageData.Time}</div>
				</div>
				<div className="bottom-content">
					<div className="bottom-left" onClick={this.props.showClassicRepertoirePage.bind(this)}>
						<div className="left-title-img"></div>
						<div className="left-click-in-img"></div>
					</div>
					<div className="bottom-right">
						<div className="right-thumbnail">
							{this.props.classicRepertoireList && this.props.classicRepertoireList.length > 0 ?
								<video id='loop-video-media' ref='media' className="video" controls="controls"
									   type='video/mp4'
									   preload="preload"
									   src={this.props.classicRepertoireList[0].Video ? this.props.classicRepertoireList[0].Video : ""}
									   poster={this.props.classicRepertoireList[0].Preview ? this.props.classicRepertoireList[0].Preview : ""}
								>
								</video> : null
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
});
module.exports = HomePage;