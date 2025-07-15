import mongoose from "mongoose";
const WorkSchema = new mongoose.Schema({
    Image:{
        type: String,
        required: true  
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
});

const WhySchema = new mongoose.Schema({
     Image:{
        type: String,
        required: true  
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },  
});

export const Work = mongoose.model('Work', WorkSchema);
export const Why = mongoose.model('Why', WhySchema);