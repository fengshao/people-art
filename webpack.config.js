var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin'); //清理文件夹
//打包模式
var webpackMode = 'dev';
if (process.argv.indexOf('p') >= 0
	||
	process.argv.indexOf('-p') >= 0
	||
	process.argv.indexOf('--p') >= 0
	||
	process.argv.indexOf('production') >= 0
	||
	process.argv.indexOf('-production') >= 0
	||
	process.argv.indexOf('--production') >= 0) {
	webpackMode = 'production';
}
if (process.argv.indexOf('-tomcat') >= 0 ||
	process.argv.indexOf('tomcat') >= 0) {
	webpackMode = "tomcat";
}


var devEntry = [
	'./publicFile/index'
];

if (webpackMode !== 'production' && webpackMode !== 'tomcat') {
	devEntry.push(
		'webpack-dev-server/client?http://localhost:3001',
		'webpack/hot/only-dev-server'
	);
}


//插件
var pluginLists = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.ProvidePlugin({
		React: 'react',
		ReactDOM: 'react-dom',
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
		'_': 'underscore',
		'Swiper': __dirname + '/src/component/swiper/swiper.js',
		'PhotoSwipe': __dirname + '/src/lib/photoSwipe/photoswipe.js',
		'PhotoSwipeUI_Default': __dirname + '/src/lib/photoSwipe/photoswipe-ui-default.js'
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		filename: 'vendor.js'
	})
];

//热替换插件
if (webpackMode !== 'production' && webpackMode !== 'tomcat') {
	pluginLists.push(new webpack.HotModuleReplacementPlugin());
}
//压缩混淆插件
if (webpackMode === 'production' || webpackMode === 'tomcat') {
	pluginLists.push(new webpack.optimize.UglifyJsPlugin({
		test: /(\.jsx|\.js)$/,
		compress: {
			warnings: false
		}
	}));

	pluginLists.push(new CleanPlugin(['dist'], {
		"root": path.resolve(__dirname, ''),
		verbose: true,
		dry: false
	}));
}

//var webpackOutPublicPath = webpackMode == "production" ? '/dist/' : "/dist/";
var webpackOutPublicPath = webpackMode == "production" ? '/dist/' : webpackMode == "tomcat" ? "./dist/" : "/dist/";

module.exports = {
	devtool: '#cheap-module-source-map',
	devServer: {
		host: '0.0.0.0'
	},
	entry: {
		home: devEntry.concat('./src/home'),
		vendor: ['react', 'antd']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].[name].[hash].[chunkhash].js',
		publicPath: webpackOutPublicPath
	},
	plugins: pluginLists,
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: [
			path.join(__dirname, 'src')
		]
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel'],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.css?$/,
				loaders: ['style', 'css'],
				include: [
					path.join(__dirname, 'src'),
					path.join(__dirname, 'node_modules/antd')
				]
			},
			{
				test: /\.scss?$/,
				loaders: ['style', 'css', 'autoprefixer', 'sass'],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url?limit=8192',
				include: [
					path.resolve(__dirname, "src")
				]
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff',
				include: [
					path.resolve(__dirname, "src")
				]
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream',
				include: [
					path.resolve(__dirname, "src")
				]
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file',
				include: [
					path.resolve(__dirname, "src")
				]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=image/svg+xml',
				include: [
					path.resolve(__dirname, "src")
				]
			}
		]
	}
};
