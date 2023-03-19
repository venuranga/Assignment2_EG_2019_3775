const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cors());

const actorRoutes = require("./routes/actor");
const directorRoutes = require("./routes/director");
const movieRoutes = require("./routes/movie");
const reviewRoutes = require("./routes/review");

const PORT = process.env.PORT || 8000;
const URL = 'mongodb+srv://svenuranga:iamleVenu98%23@cluster0.n8pqomt.mongodb.net/MovieDb?retryWrites=true&w=majority';

mongoose.connect(URL)
 .then(()=>{
    console.log("Connected")
 })

 .catch((err)=>{
    console.log('DB error',err)
 })

 app.use((req,res,next) =>{
  console.log(req.path, req.method)
  next()
 });

 app.use('/api/actors', actorRoutes);
 app.use('/api/directors', directorRoutes);
 app.use('/api/movies', movieRoutes);
 app.use('/api/reviews', reviewRoutes);


 app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
});