'use strict';

const webpack = require('webpack');
const dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = './dist/';
const ENTRY = '/server/server.ts';

/**
 * [exports description]
 * @return {[type]} [description]
 */
module.exports = (env={}) => {

  return {
    entry: [path.join(__dirname, ENTRY)],
    output: {
      filename: 'server.js',
      path: path.join(__dirname, BUILD_DIR)
    },
    target: 'node',
    module: {
      rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.ts?$/, loader: "awesome-typescript-loader" }
        ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
      new HtmlWebpackPlugin(
        {
          filename: 'index.html',
          template: 'client/index.html'
        }
      ),
      new dotenv({
        path: path.join(__dirname, '.env')
      })
    ]
  };
};
