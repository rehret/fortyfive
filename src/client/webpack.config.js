const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
                    use: [
                        {
                            loader: "awesome-typescript-loader",
                            options: {
                                configFileName: "src/client/tsconfig.json",
                                silent: true
                            }
                        },
                        {
                            loader: "angular2-template-loader"
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: "html-loader",
                },
                {
                    test: /\.(sass|scss)$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }]
                }
            ]
        },

        resolve: {
            extensions: [".js", ".ts"]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "src/client/index.html"
            })
        ]
    };

    return config;
};
