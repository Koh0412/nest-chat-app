/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client/app.ts',
  watchOptions: {
    ignored: ["node_modules", "./src/server"],
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, './public/js'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, loader: 'ts-loader'
      }
    ]
  }
};