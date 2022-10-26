/*jsonwebtoken functions such as verify() or sign() 
use algorithm that needs a secret key (as String) to encode and decode token.

In the app/config folder, create auth.config.js file with following code:
*/
module.exports = {
  secret: "syncline-secret-key"
};