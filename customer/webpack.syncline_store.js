const path=require("path");
module.exports={

    mode:"development",
    entry:"./src/user/index.js",
    output:{
        filename:'index.compiled_user.js',
      
      path: "path\\to\\server\\static\\js"
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "path/to/babel-loader",
              options: {
                presets: [ "path/to/node_modules/@babel/preset-react"
                ]
              }
            }
          }
        ]
      }
}
