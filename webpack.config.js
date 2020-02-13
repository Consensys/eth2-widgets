const HtmlWebpackPlugin = require('html-webpack-plugin');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const path = require('path');

const wasmExtensionRegExp = /\.wasm$/;

module.exports = {
    entry: './src/index.tsx',
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        port: 8080,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, "./modules"),
            outName: 'eth2-simulator',
            outDir: '../pkg'
        })
    ]
}