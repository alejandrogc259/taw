const express = require("express");
const router = express.Router();

const clientesController = require('../controllers/clientes');
const productosController = require('../controllers/productos');
const pedidosController = require('../controllers/purchaseOrder');

router.get("/", clientesController.listarClientes);
router.get("/editar/:id",clientesController.editarCliente);
router.get("/nuevo",clientesController.nuevoCliente);
router.post ("/guardar", clientesController.guardarCliente);
router.get("/borrar/:id", clientesController.borrarCliente);
router.get("/productos",productosController.listarProductos);
router.get("/productos/editar/:id",productosController.editarProducto)
router.get("/pedidos/:idCliente",pedidosController.listarPedidos)
router.get("/pedidos/nuevoPedido/nuevo",pedidosController.nuevoPedido)
router.post("/pedidos/guardar",pedidosController.guardarPedido)
module.exports = router;
