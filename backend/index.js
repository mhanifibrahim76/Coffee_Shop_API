require('dotenv').config();
const express = require('express');
const app = express();  
const port = process.env.PORT || 3000;

const cors = require('cors');

const corsOptions = {
  origin: 'http://127.0.0.1:5501',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Products
const productRoutes = require('./routes/product');
app.use('/api/products', productRoutes);

// Routes Transaction
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

// Routes users
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


app.get(`/`, (req, res) => {
  res.send('welcome to coffee shop api')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
