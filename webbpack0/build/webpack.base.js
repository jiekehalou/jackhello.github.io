const webpack = require('webpack');
// const HappyPack = require('happypack')//多线程处理文件；
// extract-text-webpack-plugin不兼容webpack 4。使用mini-css-extract-plugin代替。 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const glob = require("glob");
const path = require("path");
const chalk = require('chalk');
//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function assetsPath(_path_) {
    let assetsSubDirectory;
    if (process.env.NODE_ENV === 'production') {
        assetsSubDirectory = 'static' //可根据实际情况修改
    } else {
        assetsSubDirectory = 'static'
    }
    return path.posix.join(assetsSubDirectory, _path_)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        "main": './src/main.js',
    },
    output: {
        path: resolve('dist/'),
        filename: 'static/js/[name]-[hash].js'
            // filename: "[name].bundle.js"//打包后输出文件的文件名
    },
    resolve: {
        extensions: [".js", ".css", ".json"],
        alias: {} //配置别名可以加快webpack查找模块的速度
    },
    module: {
        rules: [{
                test: /\.html$/,
                use: [{
                    loader: 'html-withimg-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env"
                        ],

                    },
                },
                include: [resolve('src')],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]

            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: assetsPath('img/[name].[hash:7].[ext]'), // 图片输出的路径
                        limit: 1 * 1024
                    }
                },
                // include: [resolve('src')],
                // exclude: [
                //     path.resolve('static'),
                // ],
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[ext]')
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: assetsPath('font/[name].[hash:7].[ext]'), // 图片输出的路径
                        limit: 1 * 1024
                    }
                },
            },
        ]
    },
    // 提取js，lib1名字可改
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
                }
            }
        }
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: "jquery"
        // }),
        // 消除冗余的css代码
        new purifyCssWebpack({
            // glob为扫描模块，使用其同步方法
            paths: glob.sync(path.join(__dirname, "..", "src/*.html"))
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

        // 正整数递增的规则很明显太不靠谱了，好在 webpack2 以后内置了一个叫 named-modules-plugin 的模块，可以很轻松解决这个问题：
        new webpack.NamedModulesPlugin(),

        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
        }),


    ],
}