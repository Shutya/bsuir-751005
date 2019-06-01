const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    context: path.resolve(__dirname, 'app'),
    entry: {
        main: "./src/index.js"
    },
    output: {
        filename: "./src/[name].bundle.js",
        path: path.resolve(__dirname, 'dist/dev')
    },
    watch: true,
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, 'dist/dev'),
        compress: true,
        port: 9000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
                        },
                    }
                ]
            },
            {
                test: /\.html$/,
                include: path.join(__dirname, 'app', 'templates'),
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "templates/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "./css/main.css"
        })
    ]
    
}