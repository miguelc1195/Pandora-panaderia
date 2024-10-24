const express = require('express');
const router = express.Router();
const Producto = require('../modelos/producto');

// todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// producto por id
router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;