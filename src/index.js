const express = require('express')
const app = express()
const path = require('path');
require("dotenv").config();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const handlebars = require('express-handlebars');
const morgan = require('morgan')
const route = require('./routes/index.route')
const db = require('./config/db/index');

// Connect database
db.connect();

// Middleware để phục vụ các tệp tĩnh từ thư mục "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Cookie parser 
app.use(cookieParser());

// Morgan
app.use(morgan('combined'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
var hbs = handlebars.create({
  extname: '.hbs',
  helpers: require('../src/until/handlebars'),
});

// Template engine handlebars
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', (path.join(__dirname,'resources','views')));


// Khởi tạo routes
route(app);


app.listen(3000)

