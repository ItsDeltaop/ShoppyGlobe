// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const seedFromDummyJSON = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // 1. Fetch products from DummyJSON
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    // 2. Map DummyJSON fields to match your Product Mongoose Schema
    const formattedProducts = data.products.map(item => ({
      name: item.title,
      price: item.price,
      description: item.description,
      stock: item.stock
    }));

    // 3. Clear existing database products and insert fresh data
    await Product.deleteMany({});
    const inserted = await Product.insertMany(formattedProducts);

    console.log(`Successfully seeded ${inserted.length} products from DummyJSON!`);
    process.exit();
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedFromDummyJSON();