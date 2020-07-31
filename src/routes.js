const { Router } = require('express');  // Com { } eu importo apenas algumas funcionalidades do express
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/', (req, res) => {                  
    return res.json({message: 'Hello World'}); 
});

routes.get('/devs', DevController.index);      
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index); 

module.exports = routes;                       