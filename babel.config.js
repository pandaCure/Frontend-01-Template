module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        },
        corejs: '3.6',
        useBuiltIns: 'usage',
        modules: false
      }
    ],
    ['@babel/preset-typescript', { allExtensions: true }]
  ],
  compact: false
  // plugins: [
  //   ['@babel/plugin-transform-runtime', { version: '3', proposals: false }]
  // ]
}
