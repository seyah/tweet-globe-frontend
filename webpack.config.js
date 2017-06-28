'use strict';
const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3000';

loaders.push({
	test: /\.scss$/,
	loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
	exclude: ['node_modules']
});

module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.js' // Your app's entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: [
		 'node_modules',
		 './',
		 'public'
	 ],
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders
	},
	devServer: {
		contentBase: './build',
		// Do not print bundle build stats
		noInfo: true,
		// Enable HMR
		hot: true,
		// Embed the webpack-dev-server runtime into the bundle
		inline: true,
		// Serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template.html',
			files: {
				css: ['style.css'],
				js: ['bundle.js']
			}
		})
	]
};
