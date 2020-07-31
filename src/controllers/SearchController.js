const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {        
    async index(req, res) {        
        const {latitude, longitude, techs } = req.query;

        const techsArray = parseStringAsArray(techs);        
        // Busca todos os Devs em um raio de 10KM        
        const devs = await Dev.find({
            techs: {
                // "In" is a logic operator MongoDB                            
                $in: techsArray, 
            },
            // location: {
            //     $near: {
            //         $geometric: {
            //             type: 'Point',
            //             coordinates: [longitude, latitude],
            //         },                 
            //         $maxDistance: 10000,
            //     },                
            // },
        });

        return res.json({ devs });        
    }
};