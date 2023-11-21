const mongoose = require('mongoose');

const conn = () => {
    mongoose.connect('mongodb+srv://atilganajan:vX4dzXGqXz6ggyAf@instagram.varhvl0.mongodb.net/').then(() => {
        console.log("DB connect succesfully ")
    }).catch((err) => {
        console.log(`DB connection error: ${err.message}`)
    });

}


module.exports = conn


