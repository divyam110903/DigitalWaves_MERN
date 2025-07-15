import express from 'express';
import {Work,Why} from '../models/About.js'
const router = express.Router();

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


export default router;
