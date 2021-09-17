const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

//Connect to the database
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+ config.database);
});

//Database on Error
mongoose.connection.on('error', (err) => {
    console.log('Database Error '+ err);
});


//Initialize App
const app = express();

//Include Router folder
const users = require('./routes/users');

//Port Number
const port = 3000;

//Enable Cors Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Enable BodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

//Start Development Server
app.listen(port, function(){
    console.log('Server start on port ' + port);
});
