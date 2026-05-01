const express = require('express');
const router = express.Router();
// deleteProduct ko bhi yahan mangwa liya controller se
const { getProducts, addProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware'); // Security chabi check karne wala


router.get('/', auth, getProducts);
router.post('/', auth, addProduct);


router.delete('/:id', auth, deleteProduct);

module.exports = router;