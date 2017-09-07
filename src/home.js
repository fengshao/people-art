//直接引入scss,顶层目录是src,可以不用../
require("styles/home.scss");
//引入ant.design
require("antd/dist/antd.css");
import Home from './scripts/home'
ReactDOM.render(<Home  />, $('#main')[0]);