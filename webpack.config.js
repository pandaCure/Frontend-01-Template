const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackConfig = (env) => {
  return {
    mode: env ? 'production' : 'development',
    entry: './week11/index.ts',
    output: {
      filename: '[name].bundle.js',
      path: path.join(__dirname, 'dist')
    },
    devtool: env ? 'source-map' : 'inline-cheap-module-source-map',
    resolve: {
      alias: {
        vue: '@vue/runtime-dom'
      },
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue']
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.(ts|js)$/,
          loader: 'babel-loader',
          exclude: [path.resolve(__dirname, 'node_modules')]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: env ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: env
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: env ? MiniCssExtractPlugin.loader : 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: env
              }
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: env
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: env,
      minimizer: [
        new TerserPlugin({
          sourceMap: true
        })
      ],
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: {
        name: ({ name }) => `${name}_1`
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'vue.html')
      }),
      env &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        })
    ].filter(Boolean)
  }
}
module.exports = webpackConfig
