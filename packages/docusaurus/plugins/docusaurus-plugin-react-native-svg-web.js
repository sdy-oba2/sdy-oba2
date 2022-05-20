module.exports = function() {
  return {
    name: 'docusaurus-plugin-react-native-svg-web',
    configureWebpack(_config, isServer, utils) {
      return {
        resolve: {
          alias: {
            'react-native-svg': 'react-native-svg-web'
          }
        }
      }
    }
  }
}
