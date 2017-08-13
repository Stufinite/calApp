module.exports = {
  context: __dirname + "/src",
  entry: {
    javascript: "./index.jsx",
    html: "./index.html",
  },

  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true
  },

  output: {
    filename: "index.js",
    path: __dirname + "/bundle",
    sourceMapFilename: "index.js.map"
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
        test: /\.jsx?$/,
        include: [
          __dirname + "/src"
        ],
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      }, {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: "file-loader?name=/images/[name].[ext]"
      }
    ]
  }
}
