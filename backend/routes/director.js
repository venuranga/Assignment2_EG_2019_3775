const express = require('express');
const Director = require('../models/director');
const router = express.Router();


//post api
router.post('/', async (req, res) => {
    try {

        const { name, dob, nationality, filmography, awards} = req.body

        const director = new Director({
            name:name,
            dob:dob,
            nationality:nationality,
            filmography:filmography,
            awards:awards
        });
       const savedDirector = await director.save();
       res.json(savedDirector);
    }

    catch(err) {

        console.error(err);
        res.status(500).send('Server error');

    }
});


//get api
router.get('/', async(req,res) =>{
    try{
        const director = await  Director.find();
        res.send(JSON.stringify(director));
    }

    catch(err) {
        console.log(err);
        res.status(500).send('Error retrieving Directors from database');

    }
});


// get by id api
router.get('/:id', async(req,res) =>{
    try{
        const director = await  Director.findById(req.params.id);
        res.send(JSON.stringify(director));
    }

    catch(err) {
        console.log(err);
        res.status(500).send('Error retrieving Director from database');

    }
});


//update api
router.patch('/:id', async(req,res) => {
    try {
       const updatedDirector = await Director.findOneAndUpdate({_id:req.params.id}, {
          $set: {
             name: req.body.name,
             dob: req.body.dob,
             nationality: req.body.nationality,
             filmography: req.body.filmography,
             awards: req.body.awards
          }
       }, { new: true });
       res.status(200).json({
          updatedDirector: updatedDirector
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
    Director.findByIdAndDelete(req.params.id)
    .then(() => res.json('Director deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
















