
const path=require("path");
module.exports={

    mode:"development",
    entry:path.resolve( __dirname, "./customer/index.js"),
    output:{
        filename:'index.compiled_user_ts.js',
    //path: String.raw`C:\Users\user\Documents\gordon_work\syncline\server\static\js`,
    path: path.resolve(__dirname,String.raw`.\server\static\js`)
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "C:\\Users\\user\\Documents\\gordon_work\\local\\node_modules\\babel-loader",
              options: {
                presets: [ String.raw`C:\Users\user\Documents\gordon_work\tutorial_less modules\node_modules\@babel\preset-react`
                ]
              }
            }
          },  {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          }
        ]
      },resolve:{
       
          extensions:['.tsx','.ts','.js']
       
      }
}
