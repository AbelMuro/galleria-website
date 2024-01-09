const path = require('path');               //path is now a module that has access to pre defined methods that are built into Node.js
const HtmlWebpackPlugin = require("html-webpack-plugin"); //to use a plugin with webpack, you must use require
const CopyWebpackPlugin = require('copy-webpack-plugin');    //npm install copy-webpack-plugin -D         you will NEED this if you are planning on having a /public folder

//module.exports is a node.js object that accepts objects, arrays, functions and classes as values that can be used in other js modules
//to use module.exports..

//const module = module.require(./nameofFile); -----this goes on another js file
//module.key   ----accessing one of the key/properties in the module

module.exports = {

    entry: './src/index.js',                  //this is where webpack will start its dependency graph, and will automatically figure out with modules depend on this entry point                  
    output: {                                  //output is where our production code will be sent to               
        path: path.join(__dirname, '/dist'),  //__dirname represents the current directory, /dist is the folder that will contain our production code
        filename: 'bundle.js'                 //the bundled js file
    },
    plugins: [                      
        new HtmlWebpackPlugin({               //this plugin will help us generate the production html file in our /dist
            filename: 'index.html',           //our production html file will be named index.html
            favicon: './public/favicon-32x32.png',     //loading a favicon in our html template
            template: './src/index.html'      //this is a template for our production html file, we are defining how the html will look like before we make our production html file
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'public', to: '' }],        //this will copy all the files from the public folder to the build directory
          }),
    ],
    devServer: {                              //configuration property for the development server
        port: 3000,                           //the devServer will start in port 3000
        historyApiFallback: true,             //this property helps with routing in our react app, everytime we refresh the page, react router will send a request to a server, but this property will make sure it searches for an index file first
    },
    
    module: {
        rules: [                               
            {                                   //loaders are transformations that are applied to files (typescript to javascript, sass to css)
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',  //for all .js files, we will load the babel transpiler
                    options: {presets: ['@babel/preset-env', '@babel/preset-react']} //preset-env is a group of babel plugins that will transpile all the new features of javascript 
                    }                                                                 //preset-react is also a group of babel plugins, but it will transpile jsx with other new features of javascript
            },
            {
                test: /\.css$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}]             //using style loader and css loader to load css onto application
            },
            {
                test: /\.(png|jpg|webp|mp4|wav|svg)$/,
                type: 'asset/resource'                                              //asset/resource loads files such as images, audio and videos
            },                                                                     
        ]
    },
}