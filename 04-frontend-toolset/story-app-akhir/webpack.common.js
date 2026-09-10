const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Story App - Dashboard',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views/index.html'),
    }),
    new HtmlWebpackPlugin({
      title: 'Story App - Add Story',
      filename: 'add.html',
      template: path.resolve(__dirname, 'src/views/add.html'),
    }),
    new HtmlWebpackPlugin({
      title: 'Story App - Masuk',
      filename: 'login.html',
      template: path.resolve(__dirname, 'src/views/login.html'),
    }),
    new HtmlWebpackPlugin({
      title: 'Story App - Pendaftaran',
      filename: 'register.html',
      template: path.resolve(__dirname, 'src/views/register.html'),
    }),
    new HtmlWebpackPlugin({
      title: 'Story App - Profil Pengembang',
      filename: 'profile.html',
      template: path.resolve(__dirname, 'src/views/profile.html'),
    }),
    new HtmlWebpackPlugin({
      title: 'Story App - Detail Cerita',
      filename: 'detail.html',
      template: path.resolve(__dirname, 'src/views/detail.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
