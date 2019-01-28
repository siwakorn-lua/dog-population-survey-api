module.exports = function(app){
    const userController = require('../controller/userController')

    app.route('/register')
        .post(userController.register);
   
}