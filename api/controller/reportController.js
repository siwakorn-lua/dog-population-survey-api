exports.countAllDog = function(req, res) {
    let data = req.body;   
    dogModel.countAllDog(data, (error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};

exports.countDogByProvince = function(req, res) {
    dogModel.countDogByProvince(req.params.province,(error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};