// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production', 
  entry: './src/ts/app.ts', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: './dist', 
  },
  resolve: {
    extensions: ['.ts', '.js'], 
  },
  module: {
    rules: [
      {
        test: /\.ts$/, 
        use: 'ts-loader', 
        exclude: /node_modules/, 
      },
    ],
  },
};
