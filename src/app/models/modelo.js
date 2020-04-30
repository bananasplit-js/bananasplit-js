'use strict';
module.exports = (sequelize, DataTypes) => {
  const modelo = sequelize.define('modelo', {
    atributo: DataTypes.NUMBER
  }, {});
  modelo.associate = function(models) {
    // associations can be defined here
  };
  return modelo;
};