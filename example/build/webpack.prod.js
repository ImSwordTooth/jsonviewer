// 打包环境配置
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
    mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
    output: {
        publicPath: './' // 打包后文件的公共前缀路径
    },
    optimization: {
        splitChunks: { // 分隔代码
            cacheGroups: {
                vendors: { // 提取 node_modules 代码
                    test: /node_modules/, // 只匹配 node_modules 里面的模块
                    name: 'vendors', // 提取文件命名为 vendors，js 后缀和 chunkhash 会自动加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: 1, // 提取优先级为1
                },
                commons: { // 提取页面公共代码
                    name: 'commons', // 提取文件命名为 commons
                    minChunks: 2, // 只要使用两次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于 0 就提取出来
                }
            }
        }
    }
})
