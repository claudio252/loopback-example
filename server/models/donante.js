'use strict';

module.exports = function(Donante) {
  Donante.beforeRemote('create', function(context, donante, next) {
    console.log('Nuevo donante con nombre: ', context.req.body.name);

    next();
  });
};
