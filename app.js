const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Updated import for express-handlebars
const { engine } = require('express-handlebars');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index.handlebars');
});

server.listen(3000, () => {
  console.log('Server listening on Port 3000');
});