const webpack = require('webpack');
const config = 
{
  entry:
  {
    bundle: './src/js/app.js',
  },
  output:{
    path: __dirname + '/dist/js/',
    filename: '[name].js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options: {
              presets: ['babel-preset-env', 'react']
            }
          }
        ],
        exclude:/node_modules/
      },
      {
        test:/\.sass$/,
        use:['style-loader', 'css-loader', 'sass-loader'],
        exclude:/node_modules/
      }
    ]
  },
  devServer:{
    contentBase: __dirname + '/',
    port: 9000,
    compress: true,
    open: true
  }
}
module.exports  = config;