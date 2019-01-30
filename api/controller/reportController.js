exports.countAllDog = function(req, res) {
    let data = req.body;   
    console.log("dan")
    dogModel.countAllDog(data, (error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};

exports.countDogByProvince = function(req, res) {
    dogModel.countDogByProvince((error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};