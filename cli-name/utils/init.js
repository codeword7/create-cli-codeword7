const welcome = require('cli-welcome')
const pkg = require('./../package.json')
const unHandled = require('cli-handle-unhandled')

module.exports = ({ clear = true }) => {
  unHandled()
  welcome({
    title: 'cli-name',
    tagline: 'by codeword7',
    description: pkg.description,
    version: pkg.version,
    bgColor: '#6cc24a',
    color: '#000000',
    clear,
    bold: true
  })
}