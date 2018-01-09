'use strict';

module.exports = function(Regalo) {

  //metodo remoto que lista todos los libres
  Regalo.listarLibres = function(cb) {
    Regalo.find({
      fields: {
        reservado: false
      }
    }, cb);
  }

  //exponer el metodo de arribe a traves del API
  Regalo.remoteMethod('listarLibres', {
    returns: {
      arg: 'regalos',
      type: 'array'
    },
    http: {
      path: '/listar-libres',
      verb: 'get'
    }
  });

  //metodo que retorna si el regalo esta libre
  Regalo.estaLibre = function(id, cb) {
    var response;

    Regalo.find({
      fields: {
        id: id
      }
    }, function(err, regalo) {
      if (err) return cb(err);

      if (regalo.reservado)
        response = 'Lo siento, el regalo esta reservado';
      else
        response = 'El regalo esta libre';
    });

    cb(null, response);
  };

  //expone el metodo a traves del API
  Regalo.remoteMethod('estaLibre', {
    accepts: {
      arg: 'id',
      type: 'number'
    },
    returns: {
      arg: 'response',
      type: 'string'
    },
    http: {
      path: '/libre',
      verb: 'post'
    }
  });
};
