const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jeet:CHDpUWeBPMunSkOX@newcluster.mrzmb.mongodb.net/social-media', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', () => {
    console.log('connected to Database :: MongoDB');
});

module.exports = db;