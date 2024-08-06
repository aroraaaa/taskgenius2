const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
