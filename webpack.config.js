module.exports = {
    entry: ['@babel/polyfill','./src/main.js'],
    output:{
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    devServer:{
        contentBase: __dirname + '/public',
        host: '0.0.0.0',
        port: 8080,
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }

}