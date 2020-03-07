module.exports = {
  transpileDependencies: [
    'vuetify'
  ]
}

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuetify-numeric/'
    : '/',
  configureWebpack: {
    ...(process.env.NODE_ENV === 'production'
      ? {
        externals: {
          'vuetify/lib': 'vuetify/lib'
        }
      }
      : {})
  }
}
