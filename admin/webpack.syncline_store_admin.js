const path=require("path");
module.exports={

    mode:"development",
    entry:"./static/syncline_store/static/src/admin/index.js",
    output:{
        filename:'index.compiled_admin.js',
      //  path:path.resolve(__dirname,"./static/syncline_store/static/dist")
      path: "C:\\Users\\user\\Documents\\gordon_work\\syncline\\server\\static\\js"
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "C:\\Users\\user\\Documents\\gordon_work\\local\\node_modules\\babel-loader",
              options: {
                presets: [ "C:\\Users\\user\\Documents\\gordon_work\\local\\node_modules\\@babel\\preset-react"
                ]
              }
            }
          }
        ]
      }
}