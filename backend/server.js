// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

const recordSchema = new mongoose.Schema({
    text: String
});

const Record = mongoose.model('Record', recordSchema);

app.get('/api/records', async (req, res) => {
    const records = await Record.find();
    res.json(records);
});

app.post('/api/records', async (req, res) => {
    const record = new Record({ text: req.body.text });
    await record.save();
    res.json(record);
});

app.delete('/api/records/:id', async (req, res) => {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record deleted' });
});

app.put('/api/records/:id', async (req, res) => {
    const record = await Record.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
    res.json(record);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
