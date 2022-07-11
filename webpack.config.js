require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        https: true,
        hot: true,
        host: "localhost",
        port: 3000
    },
    devtool: "source-map",
    entry: ["./src/index.tsx"],
    module: {
        rules: [
            {
                test: /\.(tsx|ts|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|cur|gif|eot|ttf|woff|woff2)$/,
                use: ["url-loader"]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
        fallback: {
            fs: false
        }
    }
};
