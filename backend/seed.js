const mongoose = require('mongoose');
require('dotenv').config();

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

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await Portfolio.deleteMany({});
    console.log('Cleared existing portfolio data');

    // Sample data
    const sampleData = [
      {
        ticker: 'MSFT',
        empresa: 'Microsoft',
        dataDaCompra: new Date('2026-03-01'),
        quantidade: 20,
        precoDeCompra: 320.00
      },
      {
        ticker: 'TSLA',
        empresa: 'TESLA',
        dataDaCompra: new Date('2026-03-20'),
        quantidade: 50,
        precoDeCompra: 220.00
      },
      {
        ticker: 'AAPL',
        empresa: 'Apple',
        dataDaCompra: new Date('2026-04-15'),
        quantidade: 30,
        precoDeCompra: 150.00
      },
      {
        ticker: 'GOOGL',
        empresa: 'Alphabet',
        dataDaCompra: new Date('2026-05-01'),
        quantidade: 15,
        precoDeCompra: 2800.00
      }
    ];

    await Portfolio.insertMany(sampleData);
    console.log('Sample data inserted successfully!');
    console.log(`Added ${sampleData.length} portfolio items`);

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
