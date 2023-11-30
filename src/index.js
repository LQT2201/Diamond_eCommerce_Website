const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { engine } = require('express-handlebars');
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
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// Template engine handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', (path.join(__dirname,'resources','views')));


// Khởi tạo routes
route(app);


app.listen(3000)

