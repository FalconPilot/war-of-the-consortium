const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  performance: {
    hints: false
  }
}
