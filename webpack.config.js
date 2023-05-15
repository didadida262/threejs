/*
 * @Author: Hhvcg
 * @Date: 2023-05-15 14:57:10
 * @LastEditors: Hhvcg
 */
const path = require('path')

module.exports = {
  mode: 'development',
  // 入口文件
  entry: path.join(__dirname, 'src', 'main.js'),
  // 输出文件
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}