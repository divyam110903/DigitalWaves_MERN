import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  Location: {
    type: String,
    required: true
  },
  City:{
    type: String,
    required: true
  },
  Insta: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  }
});

const QuotationSchema = new mongoose.Schema(
  {
    firstName:   { type: String, required: true },
    lastName:    { type: String, required: true },
    email:       { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message:     { type: String, required: true },
  },
  { timestamps: true } 
);


export const Contact = mongoose.model("Contact", AddressSchema);
export const Quotation = mongoose.model("Quotation", QuotationSchema); 








