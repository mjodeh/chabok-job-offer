"use strict";
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "/lib/index.js"),
    context: path.resolve(__dirname, "../User"),
    target: "node",
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    output: {
        filename: "chabok.clickhouse.js",
        path: __dirname + "/dist",
        libraryTarget: "commonjs",
        devtoolModuleFilenameTemplate: function(info) {
            return "file:///" + encodeURI(info.absoluteResourcePath);
        }
    },
    watchOptions: {
        ignored: /node_modules|dist/
    },
    module: {
        rules: [
            {
                exclude: [
                    path.resolve(__dirname, "/data/"),
                    path.resolve(__dirname, "/data_base/")
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js"]
    },
    plugins: [
        /*new CleanWebpackPlugin('dist', {verbose: true})*/
    ],
    optimization: {
        nodeEnv: false,
        minimize: false,
        removeAvailableModules: false
    },
    performance: {
        hints: false
    }
};
