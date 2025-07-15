import mongoose from "mongoose";

const SolnSchema = new mongoose.Schema({
    title: {   
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


export const Solution = mongoose.model('Solution', SolnSchema);