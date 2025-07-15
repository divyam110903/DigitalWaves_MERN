import express from 'express';
import{Client,Data} from '../models/Client.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const [client, data] = await Promise.all([Client.find({}), Data.find({})]);
  res.json({ client, data });
});


export default router;