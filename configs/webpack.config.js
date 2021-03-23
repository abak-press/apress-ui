const
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  VueLoaderPlugin      = require('vue-loader/lib/plugin');


module.exports = {
  entry: {},
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  resolve: { modules: [ __dirname + '/../node_modules', __dirname + '/../src' ] },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
      },
      {
        test: /\.css/,
        use: [{ loader: MiniCssExtractPlugin.loader, options: { sourceMap: true } }, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|eot|woff|woff2|ttf)$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new VueLoaderPlugin(),
  ],
  stats: 'errors-only',
};
