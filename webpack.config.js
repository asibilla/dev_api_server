'use strict';

const webpack = require('webpack');
const dotenv = require('dotenv-webpack');
const path = require('path');

const BUILD_DIR = './dist/';
const ENTRY = './server/index.ts';

/**
 * [exports description]
 * @return {[type]} [description]
 */
module.exports = (env={}) => {

  process.env.DB_HOST = env.DB_HOST;
  process.env.DB_USER = env.DB_USER;
  process.env.DB_PORT = env.DB_PORT;
  process.env.DB_PASSWORD = env.DB_PASSWORD;

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
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '~': path.join(__dirname)
      }
    },
    plugins: []
  };
};
