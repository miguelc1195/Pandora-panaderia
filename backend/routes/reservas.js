const express = require("express");
const router = express.Router();
const Reserva = require("../modelos/reserva");
const Producto = require("../modelos/producto");

/* obtener todas las reservas, para admin */
router.get("/", async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* obtener todas las reservas de un usuario */
router.get("/usuario/:email", async (req, res) => {
  try {
    const reservas = await Reserva.find({ usuario: req.params.email });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* crrear nueva reserva */
router.post("/", async (req, res) => {
  const reserva = new Reserva({
    usuario: req.body.usuario,
    productos: req.body.productos,
    precioTotal: req.body.precioTotal,
    fechaRecogida: new Date(req.body.fechaRecogida),
    horaRecogida: req.body.horaRecogida,
  });

  try {
    const nuevaReserva = await reserva.save();
    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* actualizar estado de reserva y del stock cuando se completa*/
router.patch("/:id/estado", async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    reserva.estado = req.body.estado;
    await reserva.save();

    if (req.body.estado === "completada") {
      for (const producto of reserva.productos) {
        // findOne es un método de mongoose, busca un solo documento de la colección
        const productoMongo = await Producto.findOne({
          nombre: producto.producto,
        });
        if (productoMongo) {
          productoMongo.stock = productoMongo.stock - producto.cantidad;
          await productoMongo.save();
        }
      }
    }

    res.json({ message: "Reserva actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la reserva" });
  }
});

module.exports = router;
