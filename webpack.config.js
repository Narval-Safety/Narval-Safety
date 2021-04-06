const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: './src/index.js',

    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        historyApiFallback: true
    },
    entry: {
        popup: path.resolve(__dirname, "./src/index-popup.js"),
        options: path.resolve(__dirname, "./src/index-options.js"),
        foreground: path.resolve(__dirname, "./src/index-foreground.js")
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                {
                                    'plugins': ['@babel/plugin-proposal-class-properties']
                                }
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'images/[hash]-[name].[ext]',
                    },
                  },
                ],
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'src/popup.html',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            template: 'src/options.html',
            chunks: ['options']
        }),
        new HtmlWebpackPlugin({
            filename: 'foreground.html',
            template: 'src/foreground.html',
            chunks: ['foreground']
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/manifest.json', to: '[name].[ext]' },
                { from: 'src/background.js', to: '[name].[ext]' }
                ,{ from: 'src/inject_script.js', to: '[name].[ext]' }
                ,{ from: 'src/notification.js', to: '[name].[ext]' }
            ]
        }),
        new CleanWebpackPlugin()
    ]
}
