const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log('IS DEV', isDev)

const optimization = () => {
    const config = {
        splitChunks: {
            chunks:  'all'  //optimize finally bundle (for non duplication library in code)
        }
    }

    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [ {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,  //hot modul replacement 
            reloadAll: true
        },
    }, 
    'css-loader'
    ] 
    
    if(extra){
        loaders.push(extra)
    }
    
    return loaders
}

const babelOptions = preset => {
    const opts =  {
        presets:[
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }
    
    if(preset){
        opts.presets.push(preset)
    }
    
    return opts
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev){
        loaders.push('eslint-loader')
    }

    return loaders
}

const plugins = () =>{
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify:{
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([  // move any static files to dist
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to:  path.resolve(__dirname, 'dist')
            }
        ]),
        new MiniCssExtractPlugin({    //extract to css file
            filename: filename('css')
        })
    ]

    if (isProd) {
        base.push(new BundleAnalyzerPlugin)
    }

    return base
} 

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: [ '@babel/polyfill','./index1.jsx'],    //babel/polyfill support last js
        analytics: './analytics.ts',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    resolve:{
        extensions: ['.js','.png','.json'], // if you don't want to add to refference extensions
        alias:{
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    devtool: isDev ? 'source-map' : '',  // navigation on files in runtime
    plugins: plugins(),
    devServer:{
        port: 5200,
        hot: isDev   // hot module replacement
    },
    module:{ 
        rules: [  // understanding different file format
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            }
        ]
    }
}