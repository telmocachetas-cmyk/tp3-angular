const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.log('MongoDB connection error:', err);
});

// Define Portfolio Schema
const portfolioSchema = new mongoose.Schema({
  ticker: String,
  empresa: String,
  dataDaCompra: Date,
  quantidade: Number,
  precoDeCompra: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Routes

// Get all portfolio items
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await Portfolio.find();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single portfolio item
app.get('/api/portfolio/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create portfolio item
app.post('/api/portfolio', async (req, res) => {
  const portfolio = new Portfolio({
    ticker: req.body.ticker,
    empresa: req.body.empresa,
    dataDaCompra: req.body.dataDaCompra,
    quantidade: req.body.quantidade,
    precoDeCompra: req.body.precoDeCompra
  });

  try {
    const newPortfolio = await portfolio.save();
    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update portfolio item
app.put('/api/portfolio/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });

    if (req.body.ticker) portfolio.ticker = req.body.ticker;
    if (req.body.empresa) portfolio.empresa = req.body.empresa;
    if (req.body.dataDaCompra) portfolio.dataDaCompra = req.body.dataDaCompra;
    if (req.body.quantidade) portfolio.quantidade = req.body.quantidade;
    if (req.body.precoDeCompra) portfolio.precoDeCompra = req.body.precoDeCompra;
    portfolio.updatedAt = new Date();

    const updated = await portfolio.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete portfolio item
app.delete('/api/portfolio/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: 'Portfolio item not found' });

    await Portfolio.deleteOne({ _id: req.params.id });
    res.json({ message: 'Portfolio item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get stock price from Finnhub API
const axios = require('axios');

app.get('/api/stock-price/:ticker', async (req, res) => {
  try {
    const ticker = req.params.ticker.toUpperCase();
    const apiKey = process.env.FINNHUB_API_KEY;
    
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`
    );

    const quote = response.data;
    
    if (!quote || !quote.c) {
      return res.status(404).json({ message: 'Stock price not found' });
    }

    res.json({
      ticker: ticker,
      price: parseFloat(quote.c),
      change: parseFloat(quote.d),
      changePercent: parseFloat(quote.dp)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
