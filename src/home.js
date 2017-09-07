//直接引入scss,顶层目录是src,可以不用../
require("styles/home.scss");
//引入ant.design
require("antd/dist/antd.css");
var test = require("./scripts/worth-buying/public");
function init() {

	ReactDOM.render(
		<test  />,
		$('#main')[0]
	);

}
exports.init = init;