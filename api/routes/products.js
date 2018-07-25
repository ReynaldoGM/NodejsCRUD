const express = require('express');
const router = express.Router();
const con = require('../../db');



router.get('/', (req, res, next) => {

  var query = con.query('SELECT * FROM producto',[],function(error,result){
    if(error){
      throw error;
    }else{
      res.status(200).json({

        message: 'Correcto',
        datos: result

      });
    }

  });

});


router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price

    };
    if(!product.name || !product.price){
      res.status(400).json({
        message: 'Faltan parametros o son incorrectos',
      });
    }else if(!Number.isInteger(product.price)){
        res.status(400).json({

          message: 'Price debe de ser entero y sin comillas'
        });
      } else{
        var query = con.query('INSERT INTO producto(nombre,precio) VALUES (?,?)',[product.name, product.price], function(error, result){
          if(error){
            throw error;
          }else{
            res.status(201).json({
              message: 'Producto creado correctamente.',
              id: result.productId,
              name: product.name,
              price: product.price
            });
          }
        });

      }
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    var query = con.query('SELECT * FROM producto WHERE productId = ?',[id],function(error, result){
      if(error){
        throw error;
      }else if(result == ''){
          res.estatus(200).json({
            message : 'ID no existe'
          });
      }else{
        res.status(200).json({
          data : result
        });

      }


    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const product = {
      name : req.body.name,
      price: req.body.price
  };
  if(!product.name||!product.price){
    res.status(400).json({
      message: 'Faltan parametros o son incorrectos',
    });
  }else if(!Number.isInteger(product.price)){
      res.status(400).json({

        message: 'Price debe de ser entero y sin comillas'
      });
    }else{
        var query = con.query('UPDATE producto SET nombre = ?, precio = ? where productId = ?',[product.name,product.price, req.params.productId],function(error,result){

          if(error){
            throw error;

          }else{
              res.status(200).json({
                message:'Producto Actualizado',
                id: id,
                product: product
              });

          }
        });
    }
//    res.status(200).json({
//        message: 'Updated product!'
//    });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;

  var query = con.query('DELETE FROM producto where productId = ? ', [req.params.productId], function(error,result){
    if(error){
      throw error;

    }else if(result.affectedRows == 0){
      res.status(200).json({
        message: 'No existe id'

      });
    }else{
      res.status(200).json({
        message: 'Producto eliminado correctamente',
        id: id,
        resultado : result

      });
    }

  });
});

module.exports = router;
