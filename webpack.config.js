const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports={
    mode:'production',
    entry:'./src/script.ts',
    devtool:'inline-source-map',
    devServer:{
        static:{
            directory:path.resolve(__dirname,'dist')
        },
        port:3000,
        open:true,
        hot:true,
        compress:true,
        historyApiFallback:true,
    },
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:'ts-loader',
                include:[path.resolve(__dirname,'src')]
            },
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.(png|svg|jpg|jepg|gif)$/i,
                type:'asset/resource',
            }
        ]
    },
    resolve:{
        extensions:['.ts','.js'],
    },
    output:{
        publicPath:'auto',
        filename:'[name][contenthash].js',
        path:path.resolve(__dirname,'dist'),
        clean:true,
        assetModuleFilename:'[name][ext]',
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'Frontend Mentor | IP Address Tracker',
            filename:'index.html',
            template:'src/template.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name][contenthash].css",
            chunkFilename: "[id].css",
            ignoreOrder: false,
          }),
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}