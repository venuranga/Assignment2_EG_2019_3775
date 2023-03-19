const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

//post api
router.post('/', async (req, res) => {
    try {

        const { title, year, director, genre, cast, plot, rating, runtime, poster  } = req.body

        const movie = new Movie({
            title: title,
            year:year,
            director:director,
            genre:genre,
            cast:cast,
            plot:plot,
            rating:rating,
            runtime:runtime,
            poster:poster

            
        });
       const savedMovie = await movie.save();
       res.json(savedMovie);
    }

    catch(err) {

        console.error(err);
        res.status(500).send('Server error');

    }
});


//get api
router.get('/', async(req,res) =>{
    try{
        const movie = await  Movie.find();
        res.send(JSON.stringify(movie));
    }

    catch(err) {
        console.log(err);
        res.status(500).send('Error retrieving Movies from database');

    }
});


//get by id api
router.get('/:id', async(req,res) =>{
    try{
        const movie = await  Movie.findById(req.params.id);
        res.send(JSON.stringify(movie));
    }

    catch(err) {
        console.log(err);
        res.status(500).send('Error retrieving Movie from database');

    }
});


//update api
router.patch('/:id', async(req,res) => {
    try {
       const updatedMovie = await Movie.findOneAndUpdate({_id:req.params.id}, {
          $set: {
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            genre: req.body.genre,
            cast: req.body.cast,
            plot: req.body.plot,
            rating: req.body.rating,
            runtime: req.body.runtime,
            poster: req.body.poster
          }
       }, { new: true });
       res.status(200).json({
          updatedMovie: updatedMovie
       });
    } catch(err) {
       console.log(err);
       res.status(500).json({
          error: err.message
       });
    }
 });



 //delete api
router.delete('/:id', async(req,res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;















