import express from 'express';
import {Contact} from '../models/Contact.js'
const router = express.Router();

router.get("/",async(req,res)=>{
    const data = await Contact.find({});
    res.json(data);
})


export default router;