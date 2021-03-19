const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    // proxy: {
    //   '/auth': {
    //     target: 'http://localhost:3000',
    //   },
    //   '/api': {
    //     target: 'http://localhost:3000',
    //   },
    // },
  }
};
