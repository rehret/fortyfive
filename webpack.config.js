const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = env => {
    "use strict";

    env = env || process.env;

    let serverConfig = {
        entry: {
            "server": "./src/server/index.ts"
        },
        target: "node",
        node: {
            __dirname: false
        },
        externals: [nodeExternals()],

        output: {
            path: path.resolve("./dist"),
            filename: "[name].bundle.js"
        },

        devtool: (env.NODE_ENV === "production" ? "" : "source-map"),

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "awesome-typescript-loader",
                    exclude: /node_modules/
                }
            ]
        },

        resolve: {
            extensions: [".js", ".ts", ".node"]
        }
    };

    return [serverConfig];
};
