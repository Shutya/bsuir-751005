const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, 'app'),
    entry: {
        main: './src/index.jsx'
    },
    output: {
        filename: 'src/[name].bundle.js',
        chunkFilename: 'src/[name].bundle.js',
        path: path.resolve(__dirname, 'dist/prod')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist/prod'),
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
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                            name: 'img/[name].[ext]'
                        },
                    },
                    'image-webpack-loader'
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
    optimization: {
        minimizer: [
            new TerserPlugin({}), 
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
        },
    },
    resolve: {
        extensions: [ '*', '.js', '.jsx' ]
    },
    plugins: [
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'template/index.html',
            filename: './index.html',
            minify: { collapseWhitespace: true }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        })
    ]
}
