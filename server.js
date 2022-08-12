const express = require('express');
const cors = require('cors');
var path = require('path');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};


app.set('views', path.join(__dirname, 'app/views'));
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./app/routes/auth.routes')(app);
require('./app/routes/home.routes')(app);

const db = require("./app/models");
const dbConfig = require('./app/config/db.config');
const Role = db.role;

db.mongoose
.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch( err => {
    console.error("DB connection error", err);
    process.exit();
});





const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
});


function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }