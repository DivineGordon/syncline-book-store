
const path=require('path')
module.exports = (env) => {
    return require(`./webpack.${env.prod}.js`)
};