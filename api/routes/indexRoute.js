module.exports = function(app){
    const indexController = require('../controller/indexController')

    app.route('/register')
        .post(indexController.register);
   
}