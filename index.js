const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Define a Mongoose schema for contact form data
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    linkedIn: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, linkedIn, message } = req.body;
        const newContact = new Contact({ name, email, linkedIn, message });
        await newContact.save();
        res.status(201).json({ message: 'Message received!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});