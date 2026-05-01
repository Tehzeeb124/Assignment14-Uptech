const Product = require('../models/Product');

// 1. Saare products mangwane ke liye
const getProducts = async (req, res) => {
  try {
    // Sirf login kiye hue user ke products dhoondo
    const products = await Product.find({ user: req.user.id });
    res.json(products);
    console.log("Show Products");
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 2. Naya product add karne ke liye
const addProduct = async (req, res) => {
  const { name, price, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      category,
      user: req.user.id
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// 3. Product delete karne ke liye
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product nahi mila' });
    }

    // Check karein ke delete karne wala wahi user hai jisne product banaya
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Aap authorized nahi hain' });
    }

    await product.deleteOne();
    res.json({ msg: 'Product delete ho gaya' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// TEENO KO EXPORT KARNA LAZMI HAI
module.exports = { getProducts, addProduct, deleteProduct };