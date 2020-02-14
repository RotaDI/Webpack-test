const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index1.js',    
        analytics: './analytics.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization:{
        splitChunks: {
            chunks:  'all'  //optimize finally bundle (for non duplication library in code)
        }
    },
    resolve:{
        extensions: ['.js','.png','.json'], // if you don't want to add to refference extensions
        alias:{
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([  // move any static files to dist
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to:  path.resolve(__dirname, 'dist')
            }
        ])
    ],
    devServer:{
        port: 5200
    },
    module:{ 
        rules: [  // understanding different file format
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']  //from right to left
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
}