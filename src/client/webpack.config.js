const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = env => {
    "use strict";
    env = env || process.env;

    let config = {
        entry: {
            "polyfills": "./src/client/polyfills.ts",
            "vendor": "./src/client/vendor.ts",
            "fortyfive": "./src/client/main.ts"
        },

        output: {
            publicPath: "/",
            path: path.resolve("./dist/"),
            filename: "[name].bundle.js",
            chunkFilename: "[id].chunk.js"
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: {
                        loader: "awesome-typescript-loader",
                        options: {
                            configFileName: "src/client/tsconfig.json",
                            silent: true
                        }
                    }
                },
                {
                    test: /\.html$/,
                    use: "html-loader",
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    use: "file-loader?name=assets/[name].[hash].[ext]"
                },
                {
                    test: /\.css$/,
                    include: path.resolve("./src/client/app"),
                    use: "raw-loader"
                },
                {
                    test: /\.css$/,
                    exclude: path.resolve("./src/client/app"),
                    use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader?sourceMap"})
                },
                {
                    test: /\.(sass|scss)$/,
                    use: [
                        "css-to-string-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        "resolve-url-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }]
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            mimetype: "application/font-woff"
                        }
                    }
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: "file-loader"
                }
            ]
        },

        resolve: {
            extensions: [".js", ".ts"]
        },

        plugins: [
            new ExtractTextPlugin("[name].css"),

            new webpack.optimize.CommonsChunkPlugin({
                name: ['app', 'vendor', 'polyfills']
            }),

            new HtmlWebpackPlugin({
                template: "src/client/index.html"
            })
        ]
    };

    return config;
};
