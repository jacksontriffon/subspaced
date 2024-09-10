const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "inline-source-map", // For better debugging

	entry: {
		main: path.resolve(__dirname, "src/main.tsx"),
	},

	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, ".build"),
		publicPath: "/.build/",
	},

	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-typescript",
							"babel-preset-solid",
						],
					},
				},
			},
		],
	},

	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		compress: true,
		hot: true, // Enable HMR
		port: 3000, // Serve on port 3000
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html", // Adjust path to your HTML template
		}),
	],

	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
};
