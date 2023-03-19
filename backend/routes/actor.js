const express = require('express');
const Actor = require('../models/actor');
const router = express.Router();


//post api
router.post('/', async (req, res) => {
    try {

        const { name, dob, nationality, filmography, awards, socialMedia} = req.body

        const actor = new Actor({
            name:name,
            dob:dob,
            nationality:nationality,
            filmography:filmography,
            awards:awards,
            socialMedia:socialMedia
        });
       const savedActor = await actor.save();
       res.json(savedActor);
    }

    catch(err) {

        console.error(err);
        res.status(500).send('Server error');

    }
});


//get api
router.get('/', async(req,res) =>{
    try{
        const actor = await  Actor.find();
        res.send(JSON.stringify(actor));
    }

    catch(err) {
        console.log(err);
        res.status(500).send('Error retrieving Actors from database');

    }
});


//get by id api
router.get('/:id', async(req,res) =>{
    try{
        const actor = await  Actor.findById(req.params.id);
        res.send(JSON.stringify(actor));
    }

    catch(err) {
        console.log(err);
        res.status(500).send('Error retrieving Actors from database');

    }
});


//update api
router.patch('/:id', async(req,res) => {
    try {
       const updatedActor = await Actor.findOneAndUpdate({_id:req.params.id}, {
          $set: {
             name: req.body.name,
             dob: req.body.dob,
             nationality: req.body.nationality,
             filmography: req.body.filmography,
             awards: req.body.awards,
             socialMedia: req.body.socialMedia
          }
       }, { new: true });
       res.status(200).json({
          updatedActor: updatedActor
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
    Actor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Actor deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
















