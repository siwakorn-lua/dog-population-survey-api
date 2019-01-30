const reportModel = require('../model/reportModel');

exports.countAllDog = function(req, res) {
    reportModel.countAllDog(req, (error, databack) => {
        if (error) throw error;        
        res.json(databack);
    });
};

exports.countDogByProvince = function(req, res) {
    reportModel.countDogByProvince((error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};