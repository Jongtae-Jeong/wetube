const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE=path.resolve(__dirname, "assets","js","main.js");
const OUTPUT_DIR =path.join(__dirname,"static");
 
const config = {
    entry:["@babel/polyfill",ENTRY_FILE],
    devtool: "source-map",
    mode:MODE,
    module: {
        rules: [
          {
            test: /\.(js)$/,
            use: ['babel-loader']
          },
          {
            test: /\.(scss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        "autoprefixer",
                        {
                          overrideBrowserslist:"cover 99.5%"
                        },
                      ],
                    ],
                  },
                },
              },
              'sass-loader'
            ],
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin({filename: 'styles.css'}),
      ],

    output:{
        path:OUTPUT_DIR,
        filename:"[name].js"
    }
}

module.exports = config;