import express from 'express';
import { Client, Data } from '../models/Client.js';
const router = express.Router();
import { adminAuth } from '../middleware/adminAuth.js';

// GET 
router.get('/', async (req, res) => {
  try {
    const [client, data] = await Promise.all([Client.find({}), Data.findOne({})]);
    res.json({ client, data });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch client data" });
  }
});

// CLIENT ROUTES

// POST 
router.post('/', adminAuth, async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT 
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(400).json({ error: "Failed to update client" });
  }
});

// DELETE 
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete client" });
  }
});

// DATA ROUTES

// POST 
router.post('/data', adminAuth, async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: "Failed to add data" });
  }
});

// PUT update data by ID
router.put('/data/:id', adminAuth, async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(400).json({ error: "Failed to update data" });
  }
});

// DELETE data by ID
router.delete('/data/:id', adminAuth, async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

export default router;