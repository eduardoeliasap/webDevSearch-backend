require('dotenv').config({path: '../.env'});
const express = require('express');   
const mongoose = require('mongoose'); 
const cors = require('cors');
const http = require('http');         // Allows the backend to listen for http requests
const routes = require('./routes');   
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app)       // Right now I have the server outside Express

setupWebSocket(server);               // This function will be triggered as soon as our server starts, because I am passing the server as a parameter

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//app.use(cors({ origin: 'http://localhost:3333' })); // We can inform the root address when the api is in production
app.use(cors());                                      // Free external access for all types of applications
app.use(express.json());
app.use(routes);          

server.listen(3333); 
