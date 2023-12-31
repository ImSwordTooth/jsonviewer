// 开发环境配置
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 合并公共配置，并添加开发环境配置
module.exports = merge(baseConfig, {
    mode: 'development', // 开发模式，打包更加快速，省了代码优化步骤
    devtool: 'eval-cheap-module-source-map', // 源码调试模式
    devServer: {
        port: 3000, // 端口号
        compress: false, // gzip 压缩，开发环境不开启，提升热更新速度
        hot: true, // 开启热更新
        historyApiFallback: true, // 解决 history 路由 404 问题
        static: {
            directory: path.join(__dirname, '../public')
        }

    }
})

