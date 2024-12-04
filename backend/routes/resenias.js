const express = require("express");
const router = express.Router();
const Resenia = require("../modelos/resenia");

/* ver reseñas por producto */
router.get("/producto/:productoId", async (req, res) => {
  try {
    const resenias = await Resenia.find({ productoId: req.params.productoId });
    res.json(resenias);
  } catch (error) {
    req.statusCode(500).json({ message: error.message });
  }
});

/* postear reseña */
router.post("/", async (req, res) => {
  const resenia = new Resenia({
    productoId: req.body.productoId,
    usuario: req.body.usuario,
    comentario: req.body.comentario,
    puntuacion: req.body.puntuacion,
  });

  try {
    const nuevaResenia = await resenia.save();
    res.status(201).json(nuevaResenia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
