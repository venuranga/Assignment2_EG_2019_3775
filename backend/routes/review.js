const express = require('express');
const Review = require('../models/review');
const router = express.Router();


// post api
router.post('/', async (req, res) => {
    try {

        const { movieId, reviewer, rating, text, timestamp } = req.body

        const review = new Review({

            movieId: movieId,
            reviewer: reviewer,
            rating: rating,
            text: text,
            timestamp: timestamp
            
        });
       const savedReview = await review.save();
       res.json(savedReview);
    }

    catch(err) {

        console.error(err);
        res.status(500).send('Server error');

    }
});


//get api
router.get('/', async(req,res) =>{
    try{
        const review = await  Review.find();
        res.send(JSON.stringify(review));
    }

    catch(err) {
        console.log(err);
        res.status(500).send('Error retrieving Reviews from database');

    }
});


//get by id api
router.get('/:id', async(req,res) =>{
    try{
        const review = await  Review.findById(req.params.id);
        res.send(JSON.stringify(review));
    }

    catch(err) {
        console.log(err);
        res.status(500).send('Error retrieving Review from database');

    }
});


//update api
router.patch('/:id', async(req,res) => {
    try {
       const updatedReview = await Review.findOneAndUpdate({_id:req.params.id}, {
          $set: {
            movieId: req.body.movieId,
            reviewer: req.body.reviewer,
            rating: req.body.rating,
            text: req.body.text,
            timestamp: req.body.timestamp
        
          }
       }, { new: true });
       res.status(200).json({
          updatedReview: updatedReview
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
    Review.findByIdAndDelete(req.params.id)
    .then(() => res.json('Review deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;

















