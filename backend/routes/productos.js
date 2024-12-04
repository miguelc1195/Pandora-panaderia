const express = require("express");
const router = express.Router();
const Producto = require("../modelos/producto");

/* todos los productos */
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* encontrar producto por id */
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* actualizar stock de un producto por id */
router.patch("/:id/stock", async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { stock: req.body.stock },
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* reiniciar todos los productos al stock original */
router.post("/reiniciar-stock", async (req, res) => {
  try {
    const productos = await Producto.find();
    for (let producto of productos) {
      producto.stock = 20; //stock por defecto
      await producto.save();
    }
    res.json({ message: "Stock reiniciado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
