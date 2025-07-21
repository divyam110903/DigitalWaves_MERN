import express from 'express';
import {Work,Why} from '../models/About.js'
const router = express.Router();
import { adminAuth } from '../middleware/adminAuth.js';

router.get("/work",async(req,res)=>{
    const items=await Work.find({});
    res.json(items);
})

router.get("/why", async (_req, res) => {
  const data = await Why.find({});
  res.json(data);
});

router.get('/', async (_req, res) => {
  const [work, why] = await Promise.all([Work.find({}), Why.find({})]);
  res.json({ work, why });
});

//work routes

router.post('/',adminAuth,async(req,res)=>{
  try{
    const newWork=new Work(req.body);
    await newWork.save();
    res.status(201).json(newWork);
  }catch(err){
    res.status(400).json({error:err.message})
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updatedWork= await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedWork);
  } catch (err) {
    res.status(400).json({ error: "Failed to update " });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Work deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete Work" });
  }
});


//why routes

router.post('/why', adminAuth, async (req, res) => {
  try {
    const newWhy = new Why(req.body);
    await newWhy.save();
    res.status(201).json(newWhy);
  } catch (err) {
    res.status(400).json({ error: "Failed to add Why" });
  }
});

router.put('/why/:id', adminAuth, async (req, res) => {
  try {
    const updatedWhy = await Why.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedWhy);
  } catch (err) {
    res.status(400).json({ error: "Failed to update Why" });
  }
});

router.delete('/why/:id', adminAuth, async (req, res) => {
  try {
    await Why.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Why deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete Why" });
  }
});


export default router;
