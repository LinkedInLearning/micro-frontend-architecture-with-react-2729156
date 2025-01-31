const HtmlWebpackPlugin = require('html-webpack-plugin');
const { use } = require('react');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    port: 3000,
    historyApiFallback: true
  },
  output: {
    publicPath: 'auto',
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
      name: 'container',
      remotes: {
        listing: "listing@https://fantastic-capybara-x9p669qw677h9qpx-3001.app.github.dev/remoteEntry.js",
        cart: "cart@https://fantastic-capybara-x9p669qw677h9qpx-3002.app.github.dev/remoteEntry.js",
        checkout: "checkout@https://fantastic-capybara-x9p669qw677h9qpx-3003.app.github.dev/remoteEntry.js"
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};