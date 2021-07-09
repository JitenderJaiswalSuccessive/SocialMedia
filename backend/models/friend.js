const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    //the user who sent this request
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // the user who accept this request
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},{
    timestamps : true,
});

const Friend = mongoose.model("Friend", friendSchema);
module.exports = Friend;