const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        home: "./src/client/js/home.js",
        register: "./src/client/js/register.js",
        dashboard: "./src/client/js/dashboard.js",
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
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
                            implementation: require("sass"),
                        },
                    },
                ]
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
        new HtmlWebPackPlugin({
            template: "./src/client/views/dashboardV2.html",
            filename: "./dashboard.html",
            chunks: ['dashboard'],
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
    },
}
