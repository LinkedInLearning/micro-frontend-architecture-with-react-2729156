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
        listing: "listing@https://special-funicular-q94rr9gqg4j364wg-3001.app.github.dev/remoteEntry.js",
        cart: "cart@https://special-funicular-q94rr9gqg4j364wg-3002.app.github.dev/remoteEntry.js",
        checkout: "checkout@https://special-funicular-q94rr9gqg4j364wg-3003.app.github.dev/remoteEntry.js"
      },
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};