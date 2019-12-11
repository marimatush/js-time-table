const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'none',
    entry: './js/app.js',

    output: {
        filename: 'main.[contentHash].js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [new HtmlWebpackPlugin({
        template: './time-table.html'
    })]
}