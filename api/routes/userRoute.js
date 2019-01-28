module.exports = function(app){
    const userController = require('../controller/userController')

    app.route('/register')
        .post(userController.register);
    
    app.route('/addDog')
        .post(userController.addDog);

    app.post('/updateUser/:username')
        .post(userController.updateUser);
    
}