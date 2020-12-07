/** On System - Free E-Learning and conference system 
 * @name     On System
 * @version   0.1
 * @author    On System Authors
 * @copyright MIT https://github.com/On-System/On/blob/master/LICENSE
 * @date      2020-11-11 2020-12-07
 * @webpage   repository https://github.com/On-System/On
 **/

// import libs
const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
  debug: true
})
const { v4: uuidV4 } = require('uuid')

app.use('/peerjs', peerServer)

// layout engine
app.set('view engine', 'ejs')

// layout directory
app.use(express.static('layout'))

// setup webserver
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

// setup io
io.on('connection', socket => {

  socket.on('join-room', (roomId, userId) => {

    socket.join(roomId)

    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('message', (message) => {
      io.to(roomId).emit('create-message', message)
    })

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })

  })

})

// listen port
server.listen(process.env.PORT || 2021)
