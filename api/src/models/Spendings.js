const {DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	sequelize.define(
		'Spendings',
		{
			date: {
				type: DataTypes.DATE,
				// allowNull: false,
			},
			concept: {
				type: DataTypes.STRING,
				// allowNull: false,
			},
			details: {
				type: DataTypes.STRING(16384),
			},
			supplier: {
				//inicialmente es un atributo libre, pero dsps se puede crear una tabla para dar de alta proveedores
				type: DataTypes.STRING,
			},
			amount: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
		},
		{paranoid: true}
	);
};
