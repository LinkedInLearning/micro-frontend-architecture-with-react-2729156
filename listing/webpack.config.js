const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 3001,
    historyApiFallback: true
  },
  output: {
    // publicPath: 'auto',
    publicPath: 'http://localhost:3001/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'listing',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      // shared: ['react', 'react-dom', 'react-router-dom'],
      shared: {
        react: {
          singleton: true,
          requiredVersion: require('./package.json').dependencies.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: require('./package.json').dependencies['react-dom']
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: require('./package.json').dependencies['react-router-dom']
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};