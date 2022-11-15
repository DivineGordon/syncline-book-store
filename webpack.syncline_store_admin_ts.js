const path=require("path");
module.exports={

    mode:"development",
    entry:path.resolve(__dirname, String.raw`./admin/index.js`),
    output:{
        filename:'index.compiled_admin_ts.js',
  
      path:path.resolve(
        __dirname,String.raw`.\server\static\js`)
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: path.resolve(__dirname,String.raw`.\node_modules\babel-loader`),
              options: {
                presets: [  path.resolve(__dirname,String.raw`.\node_modules\@babel\preset-react`)
                ]
              }
            }
          }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          }
        ]
      },resolve:{
        extensions:['.tsx','.ts','.js']
      }
}
