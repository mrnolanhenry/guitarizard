const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        main: [ './src/index.tsx' ]
    },
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
	                        presets: [        
                                '@babel/preset-typescript',
                                '@babel/preset-env',
                                '@babel/preset-react'
	                        ],
	                        plugins: [
                                isDevelopment && require.resolve('react-refresh/babel'),
		                        '@babel/proposal-class-properties',
		                        '@babel/proposal-object-rest-spread'
	                        ].filter(Boolean)
                        }                    
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },            
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    plugins: [
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),        
        new HtmlWebpackPlugin({
            title: 'Guitarizard',
            favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'public') },
            ],
        })
    ].filter(Boolean)
};


console.log(module.exports);