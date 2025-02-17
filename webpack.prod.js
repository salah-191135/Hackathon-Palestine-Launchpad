const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {

    entry: {
        home: "./src/client/js/home.js",
        register: "./src/client/js/register.js",
    },
    output: {
        filename: "js/[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader',
                    'css-loader', {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"), // ✅ Fix for Dart Sass
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: ['html-loader'], // Processes <img> tags in HTML
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource', // Moves image files to the output folder
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/register.html",
            filename: "./register.html",
            chunks: ['register'],
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            chunks: ['home'],
        }),
        new WorkboxPlugin.GenerateSW()
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
    },
}
