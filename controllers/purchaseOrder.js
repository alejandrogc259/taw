var initModels = require("../models/init-models");
const sequelize = require("sequelize");
var models = initModels(sequelize);

const controller = {};

controller.listarPedidos = async function (req, res, next) {
    try {
        await models.PURCHASE_ORDER
            .findAll({
                where: {
                    CUSTOMER_ID: req.params.idCliente
                }
            })
            .then(async (data) => {
                const productos = await models.PRODUCT.findAll();

                //res.json(data);
                res.render("pedidos", {pedidos: data,productos: productos, cliente:req.params.idCliente});
            });
    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};

controller.nuevoPedido = async function (req, res, next) {
    let pedido;
    const productos = await models.PRODUCT.findAll({
        where: {
            AVAILABLE: 'TRUE'
        }
    });
    res.render("pedido", {pedido: pedido, productos: productos, cliente: req.query.idCliente})
};

controller.guardarPedido = async function (req, res, next) {
    try {
        if (req.body.ORDER_NUM) {
            const pedido = await models.PURCHASE_ORDER.findOne({
                where: {
                    ORDER_NUM: req.body.ORDER_NUM
                }
            });

            if (pedido) {
                await pedido.update(
                    {
                        PRODUCT_ID: req.body.PRODUCT_ID,
                        QUANTITY: req.body.QUANTITY,
                    }
                );
            }

        } else {
            await models.PURCHASE_ORDER.create(
                {CUSTOMER_ID: req.body.CUSTOMER_ID,
                    PRODUCT_ID: req.body.PRODUCT_ID,
                    QUANTITY: req.body.QUANTITY,
                    SHIPPING_COST: 10,
                    ADDRESSLINE2: req.body.ADDRESSLINE2,
                    SALES_DATE: new Date(),
                    SHIPPING_DATE: new Date(),
                    FREIGHT_COMPANY: 'MRV'}
            );
        }
        res.redirect('/pedidos/'+req.body.CUSTOMER_ID);

    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};



module.exports = controller;