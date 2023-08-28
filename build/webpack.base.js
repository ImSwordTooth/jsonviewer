// 公共配置
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 把最终构建好的静态资源都引入到一个html文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 仅在生产环境使用，目的是：在开发模式 css 会嵌入到 style 标签里面,方便样式热替换,打包时会把css抽离成单独的css文件
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const nextcss = require("postcss-cssnext");
const _ = require('lodash');

const isDev = process.env.NODE_ENV === 'development' // 是否为本地

const genericNames = require("generic-names");

const generate = genericNames("[name]_[local]_[hash:base64:5]", {
    context: process.cwd(),
});
const getLocalIdent = (loaderContext, localIdentName, localName) => generate(localName, loaderContext.resourcePath);

module.exports = {
    entry: path.join(__dirname, '../src/index.js'), // 入口文件
    output: {
        filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
        clean: true, // 在生成文件之前清空 output 目录
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    cache: { // webpack 持久化缓存，提升再次打包的速度
        type: 'filesystem' // 使用文件缓存
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                include: path.resolve(__dirname, "../src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true, // 使用默认的缓存目录 node_modules/.cache/babel-loader，用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    corejs: {
                                        version: '3',
                                        proposals: true // 支持提案
                                    },
                                    targets: {
                                        browsers: [
                                            "edge >= 16",
                                            "safari >= 9",
                                            "firefox >= 57",
                                            "ie >= 9",
                                            "ios >= 9",
                                            "chrome >= 49"
                                        ]
                                    },
                                    modules: 'umd',
                                    useBuiltIns: "entry", // 兼容性强，适合 pc
                                }
                            ],
                            '@babel/preset-react',
                        ]
                    }
                }
            },
            {
                test: /.css$/,
                // include: path.resolve(__dirname, "../src"),
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: _.pickBy({
                                localIdentName: isDev && "[path][name]_[local]",
                                getLocalIdent: !isDev && getLocalIdent,
                            })
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                parser: 'postcss-scss',
                                sourceMap: true,
                                plugins: [
                                    nextcss({
                                        browsers: [
                                            'last 2 versions',
                                            'ie >= 9',
                                            'IOS >= 8',
                                            'android >= 4'
                                        ].filter(Boolean)
                                    })
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 小于 10kb 大小的转为 base64
                    }
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名，只有文件本身变化后会生成新hash值
                    publicPath: './'
                }
            },
            {
                test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名，文件本身变化后会生成新hash值
                },
            },
            {
                test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{
                    filename:'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名，文件本身变化后会生成新hash值
                },
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // 在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件。此处优先匹配 js，然后是 jsx
        alias: {
            '@src': path.join(__dirname, '../src')
        },
        modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的 node_modules 中查找
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true // 自动注入静态资源
        }),
        !isDev && new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "[id].[contenthash:10].css",
        }),
        isDev && new ReactRefreshWebpackPlugin() // 开发模式下 react 热更新
    ].filter(Boolean),

}
