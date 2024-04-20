const User = require('../models/user');
const Sequelize = require('sequelize');

exports.postuserdetails = async(req, res, next) => {
    
    try{
        const result = await User.create(req.body);
        console.log(req.body); 
            res.status(201).json(result); 
        }catch(err){
            if (err instanceof Sequelize.UniqueConstraintError) {
                // Unique constraint violation (e.g., email already exists)
                res.status(400).json({ message: "Email already exists", err });
            } else {
                console.error("Error creating user:", err);
                res.status(500).json({ message: "Internal server error" });
            }
        }
}