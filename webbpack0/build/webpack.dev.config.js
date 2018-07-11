const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html的插件
// const CopyWebpackPlugin = require('copy-webpack-plugin');//将单个文件或整个目录复制到构建目录

const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')

const devWebpackConfig = merge(baseConfig, {
    devtool: 'eval-source-map',
    mode: 'development',
    output:{
        publicPath: '/'
      },
    devServer: {
        inline: true,//打包后加入一个websocket客户端
        hot: true,//热加载
        contentBase: path.join(__dirname, "..", "dist"), //静态文件根目录, //静态文件根目录
        host: 'localhost',//主机地址
        port: 1234,//端口
        compress: false ,//开发服务器是否启动gzip等压缩,
        overlay :true,//如果为 true ，在浏览器上全屏显示编译的errors或warnings。默认 false （关闭）如果你只想看 error ，不想看 warning。
    },
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1000 //每秒询问的文件变更的次数
    },
    plugins: [
            //收context影响；
        new HtmlWebpackPlugin({
            title: 'HtmlWebpackPlugin-test',
            // template: path.resolve(__dirname, '..', 'src', 'index.tmpl.html'),//new 一个这个插件的实例，并传入相关的参数
            template:path.resolve(__dirname, '..', 'src', 'index-tmpl.html'),//new 一个这个插件的实例，并传入相关的参数
            // template:path.resolve(__dirname, '..', 'src','./src/index.tmpl.html'),
            chunks: ['main'],
            favicon: './uncle.ico',
            filename: "index.html",
            hash: true,
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
        }),
        new webpack.HotModuleReplacementPlugin(), //HMR
        new webpack.NamedModulesPlugin() // HMR
    ]
})



module.exports = devWebpackConfig