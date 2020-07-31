const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = []; // Connection array

exports.setupWebSocket = (server) => {
    // Receives the server as a parameter, which was returned by index.js (from the project root)
    io = socketio(server);  

    /* Run only when connecting a new client */    
    io.on('connection', socket => {
        console.log(socket.id);               // socket.id brings the identifier of each connected user, making it possible to send unique messages to each connected user
        console.log(socket.handshake.query);  // Receives all values ​​that are returned by the front end

        const { latitude, longitude, techs } = socket.handshake.query;

        // *** As soon as I receive the connection I have with the socket, I can send a message to the front end (without having it requested)
        // setTimeout(() => {socket.emit('message', 'Hello Eduardo')}, 3000);

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),   
                longitude: Number(longitude), 
            },
            techs: parseStringAsArray(techs),
        }); // I am exporting the connection data to the connection constant which is responsible for storing the data for all of our connections at the moment

    }); // Every time a user connects I will receive an object called "socket"
};

// Retorna todas os clientes que estão conectados no momento (todas as conexões) filtradas por techs
exports.findConnections = (coordinates, techs) => {
    // Pego todas as minhas conexões e faço um filtro
    return connections.filter(connection => {    
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item)) 
            // I check if at least some techs from the new dev are included in searches for clients who are currently connected
    })
}

// Function to send messages to clients connected on the front-end
exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}