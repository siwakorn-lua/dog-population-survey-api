const dogModel = require('../model/dogModel');

exports.addDog = function(req, res) {
    let data = req.body;   
    dogModel.addDog(data, (error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};

exports.updateDog = function(req, res) {
    let data = req.body;
    dogModel.updateDog(data, (error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};