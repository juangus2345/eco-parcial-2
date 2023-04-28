import express, {
    request,
    response
} from "express";
import {
    Server
} from "socket.io";
import cors from "cors";

//Serial Port Configuration



import {
    Serialport,
    ReadlineParser
} from "serialPort"
const protocolConfiguration = {
    path: 'COM5',
    baudRate: 9600
}
const serialPort = new Serialport(protocolConfiguration);
const parser = serialPort.pipe(new ReadlineParser());



const PORT = 8080
const expressApp = express()
const httpServer = expressApp.listen(PORT, () => {
    console.table({
        'Game': `http://localhost:${PORT}/game`,
    })

    ioServer.on('connection', (socket) => {

        socket.on('move',moveTo=>{
            console.log(moveTo);
            socket.broadcast.emit('disp-change',moveTo)
        })
    
        socket.on('orderForArduino', (orderForArduino) => {
            port.write(orderForArduino);
            console.log('orderForArduino: ' + orderForArduino);
        });

})
const io = new Server(httpServer, {
    path: '/real-time'
})

expressApp.use('/game', express.static('public-game'))
expressApp.use(express.json())

io.on('connection', (socket) => {
    console.log('Connected!', socket.id)
    //
})

let currentScore = 0;

expressApp.get('/final-score', (request, response) => {
    response.send({
        content: currentScore
    });
})

/*___________________________________________

1) Create an endpoint to POST player's current score and print it on console
It should send a messago to ARDUINO to turn on and off the lights when the player scores a point


_____________________________________________ */

const port = new SerialPort(protocolConfiguration);

const parser = port.pipe(new ReadlineParser);
parser.on('score',(arduinoData)=>{
    let arduinoArray=arduinoData.split(' ');
    let arduinostatus = {
        statusX: parseInt(arduinoArray[0]),
        statusY: parseInt(arduinoArray[1]),
        push: parseInt(arduinoArray[2])
    }
    ioServer.emit('arduinoMessage', arduinostatus);
    console.log(arduinostatus);

expressApp.post('/score', (request, response) => {

    //
    
})


/*___________________________________________

2) Create an endpoint to POST that the game is over and turn on all the lights.
_____________________________________________ */

expressApp.post('/game-over', (request, response) => {

    //
    
})



let arduinoMessage = {
    actuatorValue: 0,
    btnAValue: 0,
    btnBValue: 0
}

parser.on('data', (data) => {
    console.log(data);
    let dataArray = data.split(' ')
    arduinoMessage.actuatorValue = parseInt(dataArray[0])
    arduinoMessage.btnAValue = parseInt(dataArray[1])
    arduinoMessage.btnBValue = parseInt(dataArray[2])

    /*___________________________________________

3) Use the socket.io instance to send the message from the ARDUINO to the client in the browser

_____________________________________________ */


});

// PUT IT HERE


