import express from 'express';
import {Solution} from '../models/Home.js'
const router = express.Router();
import { adminAuth } from '../middleware/adminAuth.js';

//get
router.get("/",async(req,res)=>{
    const data = await Solution.find({});
    res.json(data);
})



//post
router.post("/", adminAuth, async (req, res) => {
  try {
    const newSol = new Solution(req.body);
    await newSol.save();
    res.status(201).json(newSol);
  } catch (err) {
    res.status(400).json({ error: "Failed to add solution" });
  }
});
//put
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updated = await Solution.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update solution" });
  }
});


// DELETE solution
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    await Solution.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Solution deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete solution" });
  }
});

export default router;