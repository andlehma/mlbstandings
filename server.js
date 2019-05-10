const express = require("express");
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 4001;
const io = require('socket.io')(http);
const MLBApi = require('node-mlb-api')

let standings = [];
const getApiAndEmit = async (socket, force = false) => {

  let oldStandings = standings;
  standings = [];

  // National League
  let nlStandings = await MLBApi.getStandings('NL')
  .then(res => {
    res["records"].forEach(division => {
      standings.push(division);
    });
  }).catch(err => console.error(err));

  // American League
  let alStandings = await MLBApi.getStandings('AL')
  .then(res => {
    res["records"].forEach(division => {
      standings.push(division);
    });
  }).catch(err => console.error(err));

  // emit iff standings have changed
  if (JSON.stringify(oldStandings) != JSON.stringify(standings) || force){
    console.log('emitting');
    emit(socket, standings);
  }
}

function emit(socket, data){
  try {
    socket.emit("FromAPI", data)
  } catch (err) {
    console.error(err);
  }
}

// every 10s, check the standings and send to socket
let interval;
let refreshRate = 10000; // milliseconds
if (interval){
  clearInterval(interval);
}
getApiAndEmit(io, true);
interval = setInterval(() => {
  getApiAndEmit(io);
}, refreshRate);

// emit every time a user enters
io.on('connection', (socket) => {
  console.log('a user connected');
  getApiAndEmit(socket, true);
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html");
});

app.use(express.static('frontend'));

http.listen(port, () => console.log(`listening on port ${port}`));
