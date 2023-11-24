const express = require('express')
const app = express()
const path = require('path');

const { engine } = require('express-handlebars');
const morgan = require('morgan')

const route = require('./routes/index.route')

// Middleware để phục vụ các tệp tĩnh từ thư mục "public"
app.use(express.static(path.join(__dirname, 'public')));

// Morgan
app.use(morgan('combined'))

// Template engine handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', (path.join(__dirname,'resources','views')));

// Khởi tạo routes
route(app);


app.listen(3000)

