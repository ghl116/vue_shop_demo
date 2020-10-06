module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 'transform-remove-console',  //删除console输入调试信息
    '@babel/plugin-syntax-dynamic-import'
  ]
}
