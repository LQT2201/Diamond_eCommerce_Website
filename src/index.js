const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const { engine } = require('express-handlebars');
const morgan = require('morgan')

const route = require('./routes/index.route')
const db = require('./config/db/index');

// Connect database
db.connect();

// Middleware để phục vụ các tệp tĩnh từ thư mục "public"
app.use(express.static(path.join(__dirname, 'public')));


//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Cookie parser 
app.use(cookieParser());

// Morgan
app.use(morgan('combined'))

// Template engine handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', (path.join(__dirname,'resources','views')));


// Khởi tạo routes
route(app);


app.listen(3000)

