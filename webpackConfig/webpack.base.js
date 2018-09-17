const path = require("path");

const ROOT_PATH = path.join(__dirname, "../");
const CLIENT_PATH = path.join(ROOT_PATH, "/client");
const BUILD_PATH = path.join(ROOT_PATH, "/build");
console.log("HEI BOY");
module.exports = {
    entry: {
        main: path.join(CLIENT_PATH, "/app.js")
    },
    output: {
        path: BUILD_PATH,
        filename: "[name].[hash].bundle.js",
        publicPath: "/public/",//打包后的js的访问路径为：/public/**.js
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /.(js|jsx)$/,
                loader: "eslint-loader",
                exclude: [
                    path.resolve(__dirname, '../node_modules')
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'] //表示这几种文件的后缀名可以省略，按照从前到后的方式来进行补全
    }
}