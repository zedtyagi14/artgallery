const mongoose  =  require('mongoose');

const Cart = new mongoose.Schema({
    
    time: {
        type: Number,
        default: (new Date()).getTime()
    }
})