const express = require('express');
const router = express.Router();
const con = require('../../db');
//Obtener todos los resultados de la tabla ordenes
router.get('/', (req, res, next) => {
    var qurey = con.query('SELECT * FROM orders',[], function(error,result){
      if(error){
        throw error;
      }else{
        res.status(200).json({
          message: 'OK',
          data: result

        });

      }


    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };


     if(!order.productId || !order.quantity){
        res.status(400).json({
          message: 'Los campos no deben de estar vaciones'
        });
      }else if(!Number.isInteger(order.quantity || !Number.isInteger(order.productId))){

        res.status(400).json({
          message: 'Los campos deben de ser numeros enteros y sin comillas'

        });
      }else{
        var query = con.query('INSERT INTO orders(productId, cantidad) VALUES (?,?)',[order.productId, order.quantity], function(error,result){
          if (error){
            throw error;
          }else{
            res.status(201).json({
              message: 'Orden hecha correctamente',


            });

          }

      });

      }

});
//Obtener las ordenes por su id que se pasa a travez del header
router.get('/:orderId', (req, res, next) => {

      var id = req.params.orderId;

      var quey = con.query('SELECT * FROM orders where ordenId = ?', [req.params.orderId], function(error,result){

        if(error){
          throw error;
        }else{
          res.status(201).json({
            id: id,
            data: result
          });

        }

      });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;
