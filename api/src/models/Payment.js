const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    
  sequelize.define('Payment', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: 'complexUnique',
    },
    paymentMethod: {
        type: DataTypes.STRING
    }
  });
};