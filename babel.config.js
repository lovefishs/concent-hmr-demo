module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-syntax-dynamic-import'],
    ['react-refresh/babel'],
  ].filter(Boolean),
  presets: [['@babel/preset-env'], ['@babel/preset-react'], ['@babel/preset-typescript']],
}
