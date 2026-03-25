const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const scssRule = {
	test: /\.scss$/,
	use: [
		'style-loader',
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1,
				modules: {
					auto: true,
					exportLocalsConvention: 'camel-case',
					localIdentName: '[name]--[local]--[hash:base64:5]'
				}
			}
		},
		'sass-loader'
	]
};

module.exports = {
	mode: 'production',
	entry: [
		path.join(__dirname, '../src/app.js'),
	],
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			scssRule,
		]
	},
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: 'auto',
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index-dev.html',
			template: 'index-dev.html',
			inject: true
		}),
	],
	optimization: {
		providedExports: true,
		usedExports: true,
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor_app',
					chunks: 'all',
					minChunks: 2
				}
			}
		}
	},
};
