const express = require('express');
const app = express();

app.use(express.json());

let items = []; // Dummy data

// Create an item
app.post('/api/items', (req, res) => {
    const item = { id: items.length + 1, name: req.body.name };
    items.push(item);
    res.status(201).json(item);
});

// Get a single item
app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

// Get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Update an item
app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.name = req.body.name;
    res.json(item);
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });
    items.splice(itemIndex, 1);
    res.status(204).send();
});

module.exports = app;
