const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'app'),
    entry: {
        main: './src/index.jsx'
    },
    output: {
        filename: './src/[name].bundle.js',
        path: path.resolve(__dirname, 'dist/dev')
    },
    watch: true,
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist/dev'),
        compress: true,
        port: 9000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    'css-loader'
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
                    'css-loader',
                    'less-loader'
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
                use: [
                    'html-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '*', '.js', '.jsx' ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'template/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './css/main.css'
        })
    ]
    
}
