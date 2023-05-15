var initModels = require("../models/init-models");
const sequelize = require("sequelize");
var models = initModels(sequelize);

const controller = {};

controller.listarProductos = async function (req, res, next) {
    try {
        await models.PRODUCT
            .findAll()
            .then(async (data) => {

                //res.json(data);
                res.render("productos", {productos: data});
            });
    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};

// Editar cliente //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.editarProducto = async function (req, res, next) {
    try {
        const producto = await models.PRODUCT.findOne({
            where: {
                PRODUCT_ID: req.params.id
            }
        });
        const manufacturers = await models.MANUFACTURER.findAll();
        const productCodes = await models.PRODUCT_CODE.findAll();
        res.render("producto", {producto: producto, manufacturers:manufacturers, productCodes: productCodes});

    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};

// Guardar cliente //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.guardarCliente = async function (req, res, next) {
    try {
        if (req.body.CUSTOMER_ID) {
            const cliente = await models.CUSTOMER.findOne({
                where: {
                    CUSTOMER_ID: req.body.CUSTOMER_ID
                }
            });

            if (cliente) {
                await cliente.update(
                    {
                        DISCOUNT_CODE: req.body.DISCOUNT_CODE,
                        ZIP: req.body.ZIP,
                        NAME: req.body.NAME,
                        ADDRESSLINE1: req.body.ADDRESSLINE1,
                        ADDRESSLINE2: req.body.ADDRESSLINE2,
                        CITY: req.body.CITY,
                        STATE: req.body.STATE,
                        PHONE: req.body.PHONE,
                        FAX: req.body.FAX,
                        EMAIL: req.body.EMAIL,
                        CREDIT_LIMIT: req.body.CREDIT_LIMIT
                    }
                );
            }

        } else {
            await models.CUSTOMER.create(
                {DISCOUNT_CODE: req.body.DISCOUNT_CODE,
                    ZIP: req.body.ZIP,
                    NAME: req.body.NAME,
                    ADDRESSLINE1: req.body.ADDRESSLINE1,
                    ADDRESSLINE2: req.body.ADDRESSLINE2,
                    CITY: req.body.CITY,
                    STATE: req.body.STATE,
                    PHONE: req.body.PHONE,
                    FAX: req.body.FAX,
                    EMAIL: req.body.EMAIL,
                    CREDIT_LIMIT: req.body.CREDIT_LIMIT}
            );
        }
        res.redirect('/');

    } catch (error) {
        res.send("Se ha producido un error " + error);
    }
};
// Nuevo cliente //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.nuevoCliente = async function (req, res, next) {
    let cliente;
    const supermercados = await models.MICRO_MARKET.findAll();
    const descuentos = await  models.DISCOUNT_CODE.findAll();
    res.render("cliente", {supermercados: supermercados, cliente: cliente, descuentos: descuentos})
};

// Borrar cliente //////////////////////////////////////////////////////////////////////////////////////////////////////
controller.borrarCliente = async function (req, res, next) {
    const cliente = await models.CUSTOMER.findOne({
        where: {
            CUSTOMER_ID: req.params.id
        }
    });
    await cliente.destroy();
    res.redirect("/");

};

module.exports = controller;