const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_url: String,
    bio: String,
    avatar_url: String,
    techs: [String], // Array with User Techs
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
}); 

// The firt parameter is the baseName MongoDB 
module.exports = mongoose.model('Dev', DevSchema);