const bcrypt = require('bcryptjs');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

exports.register = function(req, res) {

    const salt = bcrypt.genSaltSync(10);
    let data = req.body;
    data.password = bcrypt.hashSync(data.password, salt);    

    userModel.register(data, (error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};


exports.login = function(req, res) {
    
    userModel.getUserByUsername(req.body, (error, data) => {
        if (error) throw error;

        if (data.length == 0) {
            res.status(401).send({ message: 'ไม่มีชื่อผู้ใช้นี้ในระบบ' })
        } else {
            var user = data;

            bcrypt.compare(req.body.password, user.password, function(err, match) {
                if (match) {
                    const token = jwt.sign({ username: user.username });

                    res.json({ token: token });
                } else {
                    res.status(401).send({ message: 'รหัสผ่านไม่ถูกต้อง' })
                }
            });
        }
    });
};

exports.verifyToken = function(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        const decoded = jwt.decode(token, { complete: true });

        if (decoded) {
            indexModel.getUserByUsername(decoded.payload.username, function(error, data) {
                if (error) throw error;
                if (data != null) {
                    req.username = data.username;
                    
                    return next();
                }
                else { res.status(401).send('Invalid userid'); }
            });
        }
        else { res.status(401).send('Invalid token'); }
    }
    else { res.status(401).send('Cannot get header'); }
}

exports.updateUser = function(req, res) {
    let data = req.body;
    userModel.updateUser(req.params.username,data, (error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};

exports.addDog = function(req, res) {
    let data = req.body;   
    userModel.addDog(data, (error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};

exports.updateDog = function(req, res) {
    let data = req.body;
    userModel.updateDog(data, (error, databack) => {
        if (error) throw error;        
        res.json(databack)
    });
};



