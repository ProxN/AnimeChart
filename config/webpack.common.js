
const path = require('path');

module.exports = {

    entry: {
      vendor: "./src/js/vendor.js",
      main:"./src/js/app.js"
    },
    devServer:{
        contentBase: './dist'
    },
    module:{
        rules:[
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test : /\.(png|jpg|jpeg|gif|svg)$/,
                use:{
                    loader: 'file-loader',
                    options:{
                        name:'[name].[hash].[ext]',
                        outputPath: 'img'
                    }
                }
            }
        ]
    }


};