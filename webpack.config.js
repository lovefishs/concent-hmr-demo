const { resolve } = require('path')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

const DEV_SOURCE_MAP = 'inline-source-map'

const getConfig = () => {
  const outputPath = resolve(__dirname, 'dist')
  const sourcePath = resolve(__dirname, 'src')
  const nodeModulesPath = resolve(__dirname, 'node_modules')

  return {
    target: 'web',
    mode: 'development',
    devtool: DEV_SOURCE_MAP,
    entry: {
      index: [resolve(__dirname, sourcePath, 'index.tsx')],
    },
    output: {
      path: outputPath,
      filename: '[name].js',
      publicPath: '/',
    },
    resolve: {
      modules: [sourcePath, nodeModulesPath],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': sourcePath,
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          include: [sourcePath],
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.s?css$/i,
          include: [sourcePath],
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
      ],
    },
    plugins: [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
    devServer: {
      historyApiFallback: true, // 当使用 HTML5 History API 时, 所有的 404 请求都会响应 index.html 的内容
      host: '0.0.0.0',
      port: 3000,
      inline: true,
      hot: true,
      contentBase: outputPath,
      publicPath: '/',
      noInfo: true,
      compress: false,
      liveReload: false,
      overlay: false,
      clientLogLevel: 'error', // 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error'
    },
  }
}

module.exports = getConfig()
