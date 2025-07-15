import express from 'express';
import {Solution} from '../models/Home.js'
const router = express.Router();

router.get("/",async(req,res)=>{
    const data = await Solution.find({});
    res.json(data);
})

export default router;