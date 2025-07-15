import mongoose from "mongoose";
const ClientSchema = new mongoose.Schema({
    logo:{
        type: String
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    }

});

const DataSchema= new mongoose.Schema({
    Clients_No:{
        type: Number,
    },
    projects_No:{
        type: Number,
    },
    Locations_No:{
        type: Number,
    },
});


export const Client = mongoose.model("Client", ClientSchema);
export const Data   = mongoose.model("Data",   DataSchema);
