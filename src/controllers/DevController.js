const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections } = require('../websocket');

module.exports = {        
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },
    async store(req, res) {    
        const { github_url, techs, latitude, longitude } = req.body;
    
        let dev = await Dev.findOne({github_url});                               
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_url}`);
            
            const { name = login, avatar_url, bio } = apiResponse.data;
            // if (!name) {
            // Caso o campo name retornado for vazio eu sobreponho pelo campo login (retornado do github)
            //         name = apiResponse.data.login;                     
            // }
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }; 
        
            dev = await Dev.create({
                github_url,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
            
            // Filter the connections.
            // Go through each open connection (returned in the socket),
            // Filter the data and return information to the fron-end
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );            
        }        
        return res.json(dev);
    },
    async update() {
        // *** PENDENCIA ***
    },
    async destroy() {
        // *** PENDENCIA ***
    },
}