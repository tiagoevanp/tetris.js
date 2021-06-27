const pathModule = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
	root: '.',
	dist: './dist',
	src: './src',
	get(key) {
		return pathModule.resolve(__dirname, this[key]);
	},
};

module.exports = (env) => ({
	context: paths.get('root'),

	devtool: 'source-map',
	mode: env.BUILD_MODE,

	entry: `${ paths.get('src') }/index.js`,

	plugins: [
		new HtmlWebpackPlugin({
			template: `${ paths.get('src') }/index.html`,
		}),
	],

	devServer: {
		historyApiFallback: true,
		contentBase: paths.get('dist'),
		watchContentBase: true,
		inline: true,
		host: '0.0.0.0',
		port: 3002,
	},

	output: {
		filename: 'bundle.js',
		path: paths.get('dist'),
		publicPath: env.ASSET_PATH,
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [
					/node_modules/,
				],
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
			{
				test: /\.(mp3?|ttf?)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'resources/',
						},
					},
				],
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'resources/',
						},
					},
					{
						loader: 'image-webpack-loader',
					},
				],
			},
		],
	},
});
