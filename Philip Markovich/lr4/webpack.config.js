const  HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.png|svg|jpg|gif$/,
                    use: [
                        "file-loader"
                    ]
            },
        
            {
                test: /\.js$/,
                    use: [
                        {
                            loader: "babel-loader"
                        }
                    ]
            },

            {
                test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {minimize: true}
                        }
                    ]
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}